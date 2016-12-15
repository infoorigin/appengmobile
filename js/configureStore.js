
import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from './reducers';
import promise from './promise';
import { sagas } from "./sagas/index";
import createSagaMiddleware from "redux-saga";

export default function configureStore(onCompletion:()=>void):any {
  const sagaMiddleware = createSagaMiddleware();
  
  const enhancer = compose(
    applyMiddleware(sagaMiddleware, thunk, promise),
    devTools({
      name: 'appengmobile', realtime: true,
    }),
  );

  const store = createStore(reducer, enhancer);
  persistStore(store, { storage: AsyncStorage }, onCompletion);
  sagaMiddleware.run(sagas);
  
  return store;
}
