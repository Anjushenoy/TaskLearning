import {UPDATE_USERS, SIGNIN, LOGOUT} from '../authContants/authContants';

const initialState: any = {
  users: [],
  user: [],
  isLoggedIn: false,
};

export const reducers = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_USERS:
      const user = action.payload;
      const existUser = state.users.find((value: any) => value.email === user.email);
      if (existUser) {
        return {
          ...state,
          users: state.users.map((value: any) =>
            value.email === existUser.email ? user : value,
          ),
        };
      } else {
        return {
          ...state,
          users: [...state.users, user],
        };
      }

    case SIGNIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
};