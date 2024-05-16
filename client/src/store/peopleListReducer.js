import { studentInfo } from './settingReducer';

const PEOPLELIST = 'peopleList/PEOPLELIST';

export const peopleListInfo = (info) => ({
  type: PEOPLELIST,
  info,
});
const initalState = {
  studentList: [],
};
export const peopleListReducer = (state = initalState, action) => {
  switch (action.type) {
    case PEOPLELIST:
      return {
        ...state,
        studentList: action.info.studentList,
      };
    default:
      return state;
  }
};
