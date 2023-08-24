import React from 'react';
import {persistor, store} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {RootStackRouter} from './src/routes/RootStack';
import {NavigationContainer} from '@react-navigation/native';

export function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <RootStackRouter />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
