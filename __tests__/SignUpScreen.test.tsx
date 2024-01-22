import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import SignUpScreen from '../src/screens/SignUpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {act} from 'react-test-renderer';

import {Alert} from 'react-native';

const mockNavigation = {
  navigate: jest.fn(),
};
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

// initial render case
describe('SignUpScreen', () => {
  it('renders SignUp Screen correctly', () => {
    const {getByText} = render(<SignUpScreen navigation={mockNavigation} />);
    expect(getByText('Register !')).toBeTruthy();
    expect(getByText('First Name')).toBeTruthy();
    expect(getByText('Last Name')).toBeTruthy();
    expect(getByText('User Name')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  //  leaving a field empty case
  it('missed a field error', async () => {
    const {getByText} = render(<SignUpScreen navigation={mockNavigation} />);
    await act(async () => {
      fireEvent.press(getByText('Sign Up'));
      await new Promise(resolve => setTimeout(resolve, 2000));
    });
    expect(getByText('First name is required')).toBeTruthy();
    expect(getByText('Last name is required')).toBeTruthy();
    expect(getByText('User name is required')).toBeTruthy();
    expect(getByText('Email is required')).toBeTruthy();
    expect(getByText('Password is required')).toBeTruthy();
  });

  //invalid Email case
  it(' email is invalid', async () => {
    const {getByText, getByPlaceholderText} = render(
      <SignUpScreen navigation={mockNavigation} />,
    );
    await act(async () => {
      fireEvent.changeText(
        getByPlaceholderText('Enter your Email Address'),
        'invalidEmail',
      );
      fireEvent.press(getByText('Sign Up'));
      await new Promise(resolve => setTimeout(resolve, 2000));
    });

    expect(getByText('Email is invalid')).toBeTruthy();
  });

  //invalid password case not meeting 6 character requirements
  it('password minimum 6 character requirement', async () => {
    const {getByText, getByPlaceholderText} = render(
      <SignUpScreen navigation={mockNavigation} />,
    );

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText('Enter your Password'), 'ab');
      fireEvent.press(getByText('Sign Up'));
      await new Promise(resolve => setTimeout(resolve, 2000));
    });

    expect(
      getByText('Password should be minimum of 6 characters'),
    ).toBeTruthy();
  });

  //successfully signed up
  // it(' Sign Up is pressed', async () => {
  //   const {getByText, getByPlaceholderText} = render(
  //     <SignUpScreen navigation={mockNavigation} />,
  //   );

  //   fireEvent.changeText(getByPlaceholderText('Enter your First Name'), 'Test');
  //   fireEvent.changeText(getByPlaceholderText('Enter your Last Name'), 'User');
  //   fireEvent.changeText(
  //     getByPlaceholderText('Enter your Email Address'),
  //     'testuser@example.com',
  //   );
  //   fireEvent.changeText(
  //     getByPlaceholderText('Enter your Password'),
  //     'password',
  //   );

  //   const mockSetItem = jest.spyOn(AsyncStorage, 'setItem');
  //   const mockAlert = jest.spyOn(Alert, 'alert');

  //   await act(async () => {
  //     fireEvent.press(getByText('Sign Up'));
  //     await new Promise(resolve => setTimeout(resolve, 2000));
  //   });

  //   expect(mockSetItem).toHaveBeenCalled();
  //   expect(mockAlert).not.toHaveBeenCalledWith(
  //     'Error',
  //     'Email is already registered',
  //   );
  //   expect(mockNavigation.navigate).toHaveBeenCalledWith('SignInScreen');
  // });
});
