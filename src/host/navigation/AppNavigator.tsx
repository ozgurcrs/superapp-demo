import React, {Suspense, lazy} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RemoteErrorBoundary from '../components/RemoteErrorBoundary';
import RemoteLoading from '../components/RemoteLoading';
import type {RootStackParamList} from './types';

const FinansScreen = lazy(() => import('finans/FinansScreen'));
const MarketScreen = lazy(() => import('market/MarketScreen'));

const Stack = createNativeStackNavigator<RootStackParamList>();

type RouteProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

const FinansRoute = (props: RouteProps<'Finans'>) => (
  <RemoteErrorBoundary moduleName="Finans">
    <Suspense fallback={<RemoteLoading moduleName="Finans" />}>
      <FinansScreen {...props} />
    </Suspense>
  </RemoteErrorBoundary>
);

const MarketRoute = (props: RouteProps<'Market'>) => (
  <RemoteErrorBoundary moduleName="Market">
    <Suspense fallback={<RemoteLoading moduleName="Market" />}>
      <MarketScreen {...props} />
    </Suspense>
  </RemoteErrorBoundary>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Finans" component={FinansRoute} />
      <Stack.Screen name="Market" component={MarketRoute} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
