import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import reducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import rootEpic from '../epic';

const epicMiddleware = createEpicMiddleware(rootEpic);
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
};
const persistedReducer = persistReducer(persistConfig, reducers);

// export default function configureStore() {
export const store = createStore(
  persistedReducer,
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(epicMiddleware)
    : applyMiddleware(epicMiddleware, logger)
);
export const persistor = persistStore(store);
// return store;
// }
