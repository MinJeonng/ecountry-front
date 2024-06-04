//일단 auth 를 대략적으로 넣어놓을게요
//새로고침해도 유지되는 redux

const USERINFO = 'auth/userInfo';

export const auth = (info) => ({ type: USERINFO, info });

const initialState = { id: null, isStudent: null, countryList: [] };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERINFO:
      if (action.info) {
        return action.info;
      } else {
        return initialState;
      }
    default:
      return state;
  }
};
export default authReducer;
