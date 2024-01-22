import {useSelector} from 'react-redux';

export const allUsers = () => {
  return useSelector((state: GlobalState) => state.users);
};

export const useLoggedInUser = () => {
  return useSelector((state: GlobalState) => state.user);
};

export const useLoggedIn = () => {
  return useSelector((state: GlobalState) => state.isLoggedIn);
};