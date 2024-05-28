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
    default:
      return state;
  }
};

export default studentInfoReducer;
