// export const STUDENT_INFO_LIST = 'STUDENT_INFO_LIST';

// export const setStudentInfoList = (studentInfoList) => ({
//   type: STUDENT_INFO_LIST,
//   payload: studentInfoList,
// });

// const initialState = {
//   studentInfoList: [],
// };
// const studentInfoReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case STUDENT_INFO_LIST:
//       return {
//         ...state,
//         studentInfoList: action.payload,
//       };
//     default:
//       return state;
//   }

// };

// export default studentInfoReducer;
import { PURGE } from 'redux-persist';
export const STUDENT_INFO_LIST = 'STUDENT_INFO_LIST';

export const setStudentInfoList = (studentInfoList) => ({
  type: STUDENT_INFO_LIST,
  payload: studentInfoList,
});

const initialState = {
  studentInfoList: [],
};

const studentInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT_INFO_LIST:
      return {
        ...state,
        studentInfoList: action.payload,
      };
    case PURGE:
      return initialState; // PURGE 액션에 대해 초기 상태를 반환하여 리듀서를 초기화합니다.
    default:
      return state;
  }
};

export default studentInfoReducer;
