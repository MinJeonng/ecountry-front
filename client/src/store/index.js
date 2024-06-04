import { combineReducers } from 'redux';
import {
  setting1Reducer,
  setting2Reducer,
  setting3Reducer,
  setting4Reducer,
  setting5Reducer,
  setting6Reducer,
  setting7Reducer,
  setting8Reducer,
  setting9Reducer,
} from './settingReducer';
import { peopleListReducer } from './peopleListReducer';
import { studentReducer } from './selectedStudentIdReducer';
import studentInfoReducer from './studentInfoReducer';
import authReducer from './userInfoReducer';

//추가
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  setting1: setting1Reducer,
  setting2: setting2Reducer,
  setting3: setting3Reducer,
  setting4: setting4Reducer,
  setting5: setting5Reducer,
  setting6: setting6Reducer,
  setting7: setting7Reducer,
  setting8: setting8Reducer,
  setting9: setting9Reducer,
  peopleList: peopleListReducer,
  student: studentReducer,
  studentInfo: studentInfoReducer,
  auth: authReducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // 새로고침해도 유지되어야 하는 reducer만 whitelist에 추가
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, //루트
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// const persistor = persistStore(store);

// export { store, persistor };

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
