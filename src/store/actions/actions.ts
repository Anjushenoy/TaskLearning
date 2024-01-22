import {UPDATE_USERS, SIGNIN, LOGOUT} from '../authContants/authContants';

let Id = 0;

export const modifyUser = (user: any) => ({
  type: UPDATE_USERS,
  payload: {
    id: ++Id,
    email: user.email,
    user_name: user.user_name,
    first_name: user.first_name,
    last_name: user.last_name,
    password: user.password,
  },
});

export const login = (user: any) => ({
  type: SIGNIN,
  payload: {
    email: user.email,
    user_name: user.user_name,
    first_name: user.first_name,
    last_name: user.last_name,
   password: user.password,
  },
});

export const logout = () => ({
  type: LOGOUT,
});