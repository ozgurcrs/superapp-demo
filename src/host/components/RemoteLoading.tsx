import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

type Props = {
  moduleName: string;
};

const RemoteLoading = ({moduleName}: Props) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#2563EB" />
    <Text style={styles.text}>{moduleName} yükleniyor…</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
});

export default RemoteLoading;
