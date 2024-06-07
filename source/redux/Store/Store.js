import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import mainReducers from '../Main/index';

const middleware = [thunk];

const rootReducer = combineReducers({
  mainReducers,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['navigation'],
  timeout: 0,
};

const pReducer = persistReducer(persistConfig, rootReducer);

function configureStore() {
  const enhancer = compose(applyMiddleware(...middleware));
  return createStore(pReducer, {}, enhancer);
}

export const store = configureStore();
export const persistor = persistStore(store);
