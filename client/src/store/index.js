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
});

export default rootReducer;
