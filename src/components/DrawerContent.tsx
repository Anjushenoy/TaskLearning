import React, {useState} from 'react';
import {View, Text, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import HamburgerIcon from 'react-native-vector-icons/FontAwesome';
import {Drawer} from 'react-native-drawer-layout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {logout} from '../store/actions/actions';

const DrawerContent = ({children, navigation, user}: DrawerProps) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const LogOut = async () => {
    try {
      dispatch(logout());
      // navigation.navigate('SignInScreen');
    } catch (error) {
      Alert.alert('Error', 'Error logging of from the application');
    }
  };

  const DrawerView = () => (
    <View style={styles.drawerContainer}>
      <Text
        style={{
          color: '#009387',
          fontWeight: 'bold',
          fontSize: 22,
        }}>{`Hi ${user?.user_name}`}</Text>
      <View style={styles.userInfoDrawer}>
        <Text style={styles.userInfoText}>{`Hi ${user?.user_name}`}</Text>
        <Text style={styles.userInfoText}>{`Email :  ${user?.email}`}</Text>
        <Text
          style={
            styles.userInfoText
          }>{`First Name : ${user?.first_name}`}</Text>
        <Text
          style={styles.userInfoText}>{`Last Name : ${user?.last_name}`}</Text>
      </View>

      <TouchableOpacity onPress={LogOut}>
        <LinearGradient
          colors={['#08d4c4', '#01ab9d']}
          style={[styles.signIn, {marginTop: 50}]}>
          <Text style={styles.textSign}>Sign Out</Text>
          <MaterialIcons name="logout" color="#fff" size={20} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={DrawerView}>
      <View style={styles.headerContainer}>
        <HamburgerIcon
          name="bars"
          size={30}
          color="#fff"
          onPress={() => setOpen(prevOpen => !prevOpen)}
        />

        <View style={styles.profileContainer}>
          <Text style={styles.headerText}>
            {' '}
            Welcome {user?.first_name} {user?.last_name}!
          </Text>
        </View>
      </View>
      {children}
    </Drawer>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#009387',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 20,
  },
  profileContainer: {
    flexDirection: 'row',
  },
  drawerContainer: {
    flex: 1,
    padding: 20,
  },
  userInfoDrawer: {
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#009387',
    marginTop: 10,
    borderRadius: 10,
  },
  userInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 10,
    paddingRight: 5,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    paddingRight: 5,
  },
});

export default DrawerContent;
