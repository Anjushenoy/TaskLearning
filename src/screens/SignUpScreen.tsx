import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import InputField from '../components/InputField';
import {useForm} from 'react-hook-form';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {allUsers} from '../store/selectors/selectors';
import {modifyUser} from '../store/actions/actions';

const SignUpScreen = ({navigation}: Navigation) => {
  const {control, handleSubmit} = useForm();
  const dispatch = useDispatch();
  const signedUpUser = allUsers();

  const SignUpHandler = (data: SignUpData) => {
    try {
      const isEmailRegistered = signedUpUser.some(
        (user: User) => user.email === data.email,
      );
      if (isEmailRegistered) {
        Alert.alert('Error', 'Email is already registered');
      }
      dispatch(modifyUser(data));
      navigation.navigate('SignInScreen', {registeredEmail: data.email});
    } catch (error) {
      Alert.alert('Error', 'Error Found');
    }
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Register !</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
        <ScrollView>
          <View style={styles.footer}>
            <InputField
              label="First Name"
              name="first_name"
              placeholder="Enter your First Name"
              control={control}
              rules={{required: 'First name is required'}}
            />
            <InputField
              label="Last Name"
              name="last_name"
              placeholder="Enter your Last Name"
              control={control}
              rules={{required: 'Last name is required'}}
            />
            <InputField
              label="User Name"
              name="user_name"
              placeholder="Enter your User Name"
              control={control}
              rules={{required: 'User name is required'}}
            />
            <InputField
              label="Email"
              name="email"
              placeholder="Enter your Email Address"
              keyboardType="email-address"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {value: emailRegex, message: 'Email is invalid'},
              }}
            />
            <InputField
              label="Password"
              name="password"
              placeholder="Enter your Password"
              password
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password should be minimum of 6 characters',
                },
              }}
            />
            <TouchableOpacity onPress={handleSubmit(SignUpHandler)}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={[styles.signIn, {marginTop: 15}]}>
                <Text style={styles.textSign}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 0.5,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  footer: {
    flex: 3.5,
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
