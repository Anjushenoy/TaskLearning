import React from 'react';
import {useLoggedIn} from '../store/selectors/selectors';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Navigator = () => {
  const isAuthenticated = useLoggedIn();
  return <>{isAuthenticated ? <AppStack /> : <AuthStack />}</>;
};

export default Navigator;
