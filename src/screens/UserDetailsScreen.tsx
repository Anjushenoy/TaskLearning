import React from 'react';
import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm} from 'react-hook-form';
import InputField from '../components/InputField';
import {useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {useLoggedInUser, allUsers} from '../store/selectors/selectors';
import {login, modifyUser} from '../store/actions/actions';
type ScreenProps = {
  navigation: Navigation;
  route: any;
};
const UserDetailsScreen = ({route, navigation}: ScreenProps) => {
  const {user} = route.params;
  const {control, handleSubmit} = useForm();
  const loggedUser = useLoggedInUser();
  const users = allUsers();

  const dispatch = useDispatch();
  const UpdateUserName = async (data: UpdateFormData) => {
    try {
      if (users) {
        const matchedUser = users.find((u: User) => u.email === data.email);

        if (matchedUser) {
          const updatedUserData = {
            ...matchedUser,
            user_name: data.user_name,
          };

          if (updatedUserData.email === loggedUser.email) {
            dispatch(login(updatedUserData));
          }
          dispatch(modifyUser(updatedUserData));
          navigation.navigate('HomeScreen');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Error in updating your user name');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Your Profile!!!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.footer}>
          <Text>Edit Your User Name</Text>

          <View>
            <InputField
              label="Email"
              name="email"
              keyboardType="email-address"
              control={control}
              defaultValue={user?.email}
              editable={false}
            />
            <InputField
              label="User Name"
              name="user_name"
              control={control}
              defaultValue={user?.user_name}
            />
          </View>
          <TouchableOpacity onPress={handleSubmit(UpdateUserName)}>
            <LinearGradient
              colors={['#08d4c4', '#01ab9d']}
              style={[styles.signIn, {marginTop: 15}]}>
              <Text style={styles.textSign}>Update User Name</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default UserDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 0.5,
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
    paddingTop: 20,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },

  userList: {
    marginTop: 20,
    marginBottom: 4,
    borderRadius: 30,
    backgroundColor: '#009387',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  userListItem: {
    fontSize: 16,
    color: '#fff',
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
