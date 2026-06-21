import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../../host/navigation/types';
import {fetchPhoto} from '../api/photos';
import type {Photo} from '../api/photos';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Market'>;
};

const MarketScreen = ({navigation}: Props) => {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPhoto()
      .then(setPhoto)
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : 'Veri alınamadı'),
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Geri</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Market Modülü</Text>
        <Text style={styles.subtitle}>Remote Bundle (FAZ 4)</Text>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Ürün #10</Text>
          {loading && (
            <ActivityIndicator color="#1D4ED8" style={styles.loader} />
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
          {photo && (
            <>
              <Image source={{uri: photo.url}} style={styles.image} />
              <Text style={styles.cardValue}>{photo.title}</Text>
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
  backText: {fontSize: 16, color: '#2563EB', fontWeight: '500'},
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
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: '#BFDBFE',
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
  errorText: {fontSize: 14, color: '#991B1B'},
  image: {width: '100%', height: 200, borderRadius: 8, marginBottom: 12},
  cardValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D4ED8',
    textAlign: 'center',
  },
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

export default MarketScreen;
