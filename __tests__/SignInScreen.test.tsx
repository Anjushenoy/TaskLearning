import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import SignInScreen from '../src/screens/SignInScreen';
import {act} from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const mockNavigation = {
  navigate: jest.fn(),
};
const mockAlert = jest.spyOn(Alert, 'alert');
const mockUsers = [{email: 'test@example.com', password: 'test@123'}];

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(() => mockUsers),
}));
describe('SignInScreen', () => {
  it('renders SignIn Screen correctly', () => {
    const {getByText, getByPlaceholderText} = render(
      <SignInScreen navigation={mockNavigation} route={{}} />,
    );
    expect(getByText('Welcome!')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your Email Address')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Enter your Password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('No Account yet? Please Sign Up')).toBeTruthy();
  });

  //In successfull Sign In case
  it('if its successfull', async () => {
    const {getByText, getByPlaceholderText} = render(
      <SignInScreen navigation={mockNavigation} route={{}} />,
    );
    fireEvent.changeText(
      getByPlaceholderText('Enter your Email Address'),
      'test@example.com',
    );
    fireEvent.changeText(
      getByPlaceholderText('Enter your Password'),
      'test@123',
    );
    await act(async () => {
      fireEvent.press(getByText('Sign In'));
      await new Promise(resolve => setTimeout(resolve, 2000));
    });
    expect(mockNavigation.navigate).toHaveBeenCalledWith('HomeScreen');
  });

  // Invalid email case
  it('for invalid email', async () => {
    const {getByText, getByPlaceholderText} = render(
      <SignInScreen navigation={mockNavigation} route={{}} />,
    );
    fireEvent.changeText(
      getByPlaceholderText('Enter your Email Address'),
      'invalidemail@gmail.com',
    );
    fireEvent.changeText(
      getByPlaceholderText('Enter your Password'),
      'test@123',
    );
    fireEvent.press(getByText('Sign In'));
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Error', 'Email Does not exist');
    });
  });

  // Invalid password case
  it('for invalid password', async () => {
    const {getByText, getByPlaceholderText} = render(
      <SignInScreen navigation={mockNavigation} route={{}} />,
    );
    fireEvent.changeText(
      getByPlaceholderText('Enter your Email Address'),
      'test@example.com',
    );
    fireEvent.changeText(
      getByPlaceholderText('Enter your Password'),
      'test@321',
    );
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Error', 'Invalid Password');
    });
  });

  //  leaving a field empty case
  it('missed a field error', async () => {
    const {getByText} = render(
      <SignInScreen navigation={mockNavigation} route={{}} />,
    );

    await act(async () => {
      fireEvent.press(getByText('Sign In'));
      await new Promise(resolve => setTimeout(resolve, 2000));
    });

    expect(getByText('Email is required')).toBeTruthy();
    expect(getByText('Password is required')).toBeTruthy();
  });

  //Sign Up click case
  it('navigates to SignUpScreen', () => {
    const {getByText} = render(
      <SignInScreen navigation={mockNavigation} route={{}} />,
    );
    fireEvent.press(getByText('Sign Up'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('SignUpScreen');
  });
});
