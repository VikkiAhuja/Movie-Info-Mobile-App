/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MainNavigation from './src/navigation/MainNavigation';

const App = props => {
  return (
    <SafeAreaProvider>
      <MainNavigation />
    </SafeAreaProvider>
  )
}

export default App;
