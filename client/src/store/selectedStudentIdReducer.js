// 액션 타입 정의
export const SET_SELECTED_STUDENT_ID = 'SET_SELECTED_STUDENT_ID';
export const SET_SELECTED_STUDENT_NAME = 'SET_SELECTED_STUDENT_NAME';

// 생성자
export const setSelectedStudentId = (id) => ({
  type: SET_SELECTED_STUDENT_ID,
  payload: id,
});

export const setSelectedStudentName = (name) => ({
  type: SET_SELECTED_STUDENT_NAME,
  payload: name,
});

const initialState = {
  selectedStudentId: null,
  selectedStudentName: '',
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_STUDENT_ID:
      return {
        ...state,
        selectedStudentId: action.payload,
      };
    case SET_SELECTED_STUDENT_NAME:
      return {
        ...state,
        selectedStudentName: action.payload,
      };
    default:
      return state;
  }
};
