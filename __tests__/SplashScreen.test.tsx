import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import SplashScreen from '../src/screens/SplashScreen';

const mockNavigation = {
  navigate: jest.fn(),
};

describe('SplashScreen', () => {
  it('renders splashscreen correctly', () => {
    const {getByText} = render(<SplashScreen navigation={mockNavigation} />);
    expect(getByText('Stay connected with everyone!')).toBeTruthy();
  });

  it('navigates to SignIn Screen when we press on Sign In button', () => {
    const {getByText} = render(<SplashScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('Sign In'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('SignInScreen');
  });

  it('navigates to SignUp screen when we press on Sign Up button', () => {
    const {getByText} = render(<SplashScreen navigation={mockNavigation} />);
    fireEvent.press(getByText('Sign Up'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('SignUpScreen');
  });
});
