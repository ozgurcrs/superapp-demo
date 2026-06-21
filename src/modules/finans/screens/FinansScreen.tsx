import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../../host/navigation/types';
import {fetchBitcoinPrice} from '../api/coinGecko';
import type {BitcoinPrice} from '../api/coinGecko';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Finans'>;
};

const FinansScreen = ({navigation}: Props) => {
  const [price, setPrice] = useState<BitcoinPrice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBitcoinPrice()
      .then(setPrice)
      .finally(() => setLoading(false));
  }, []);

  const changeColor =
    price && price.usd_24h_change >= 0 ? '#166534' : '#991B1B';
  const changeSign = price && price.usd_24h_change >= 0 ? '+' : '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Geri</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Finans Modülü</Text>
        <Text style={styles.subtitle}>Remote Bundle (FAZ 4)</Text>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Bitcoin (BTC)</Text>
          {loading && (
            <ActivityIndicator color="#166534" style={styles.loader} />
          )}
          {price && (
            <>
              <Text style={styles.priceText}>
                ${price.usd.toLocaleString('en-US')}
              </Text>
              <Text style={[styles.changeText, {color: changeColor}]}>
                {changeSign}
                {price.usd_24h_change.toFixed(2)}% (24s)
              </Text>
            </>
          )}
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Modül Durumu</Text>
          <Text style={styles.infoValue}>Remote Bundle (FAZ 4)</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  header: {paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8},
  backText: {fontSize: 16, color: '#E63946', fontWeight: '500'},
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  title: {fontSize: 28, fontWeight: 'bold', color: '#1A1A2E', marginBottom: 4},
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  loader: {marginVertical: 8},
  priceText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  changeText: {fontSize: 16, fontWeight: '600'},
  infoCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  infoValue: {fontSize: 16, fontWeight: '600', color: '#374151'},
});

export default FinansScreen;
