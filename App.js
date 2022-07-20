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
const App = props => {
  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <MainNavigation />
      </SafeAreaProvider>
    </RootSiblingParent>
  )
}

export default App;
