/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RootSiblingParent } from 'react-native-root-siblings';

import MainNavigation from './src/navigation/MainNavigation';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <SafeAreaProvider>
            <MainNavigation />
          </SafeAreaProvider>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  )
}

export default App;
