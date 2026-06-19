import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TG SuperApp</Text>
      <Text style={styles.subtitle}>Core Module</Text>
      <TouchableOpacity
        style={[styles.button, styles.buttonFinans]}
        onPress={() => navigation.navigate('Finans')}>
        <Text style={styles.buttonText}>Finans Modülü</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonMarket]}
        onPress={() => navigation.navigate('Market')}>
        <Text style={styles.buttonText}>Market Modülü</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 48,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonFinans: {
    backgroundColor: '#E63946',
  },
  buttonMarket: {
    backgroundColor: '#2563EB',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
