/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Navigation from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import Store from './src/store/Store';

function App() {
  return (
    <Provider store={Store}>
      <Navigation/>
    </Provider>
  );
}

export default App;


