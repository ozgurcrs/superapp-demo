import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FinansScreen from '../screens/finans/FinansScreen';
import MarketScreen from '../screens/market/MarketScreen';
import type {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Finans" component={FinansScreen} />
        <Stack.Screen name="Market" component={MarketScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
