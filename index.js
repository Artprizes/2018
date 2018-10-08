import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './src/store';
import { LoadingPage } from './src/components/LoadingPage';
import {
  authSetToken,
  authDiscardToken,
  authGetToken
} from './src/actions/actions';
import { AsyncStorage } from 'react-native';

import App from './App';

import { rootEpic } from './src/epic';

global.persistor = persistor;

console.disableYellowBox = true;
persistor.purge();
const ReduxApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
AppRegistry.registerComponent('artprizesnative', () => ReduxApp);
