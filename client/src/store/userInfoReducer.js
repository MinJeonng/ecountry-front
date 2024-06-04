//일단 auth 를 대략적으로 넣어놓을게요
//새로고침해도 유지되는 redux

const authReducer = (state = { isAuthenticated: false }, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};
export default authReducer;
