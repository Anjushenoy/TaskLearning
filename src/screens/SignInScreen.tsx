import React, {useEffect, useState} from 'react';
import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import InputField from '../components/InputField';
import {useForm} from 'react-hook-form';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {allUsers} from '../store/selectors/selectors';
import {useDispatch} from 'react-redux';
import {login} from '../store/actions/actions';

type SignInProps = {
  navigation: Navigation;
  route: any;
};

const SignInScreen = ({route, navigation}: SignInProps) => {
  const {control, handleSubmit, setValue} = useForm();
  const dispatch = useDispatch();
  const users = allUsers();

  useEffect(() => {
    // const fetchUsers = async () => {
    //   const users = await AsyncStorage.getItem('users');
    //   if (users !== null) {
    //     dispatch({type: 'ADD_USER', payload: JSON.parse(users)});
    //   }
    // };

    // fetchUsers();
    const registeredEmail = route.params?.registeredEmail;
    if (registeredEmail) {
      setValue('email', registeredEmail);
    }
  }, [dispatch, route, setValue]);

  // const users = useSelector((state: GlobalState) => {
  //   return state.data;
  // });

  const SignInHandler = (data: SignInData) => {
    setValue('password', '');
    try {
      const matchedUser = users.find((user: User) => user.email === data.email);
      if (matchedUser) {
        if (matchedUser.password === data.password) {
          // dispatch({type: 'SET_LOGIN', payload: matchedUser});
          dispatch(login(matchedUser));
          return navigation.navigate('HomeScreen');
        } else {
          return Alert.alert('Error', 'Invalid Password');
        }
      }
      return Alert.alert('Error', 'Email Does not exist');
    } catch (error) {
      return Alert.alert('Error', 'Invalid User');
    }
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
        <View style={styles.footer}>
          <View>
            <InputField
              label="Email"
              name="email"
              placeholder="Enter your Email Address"
              keyboardType="email-address"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {value: emailRegex, message: 'Invalid Email'},
              }}
            />
            <InputField
              label="Password"
              name="password"
              placeholder="Enter your Password"
              control={control}
              password
              rules={{
                required: 'Password is required',
              }}
            />
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={handleSubmit(SignInHandler)}>
                <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={[styles.signIn, {marginTop: 15}]}>
                  <Text style={styles.textSign}>Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>
              <View>
                <Text style={styles.infoText}>
                  No Account yet? Please Sign Up
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUpScreen')}>
                <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={[styles.signIn, {marginTop: 15}]}>
                  <Text style={styles.textSign}>Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  infoText: {
    marginTop: 40,
    color: '#009387',
    fontSize: 15,
    fontWeight: 'bold',
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    marginTop: 10,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
