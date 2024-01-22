import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import DrawerContent from '../components/DrawerContent';
import * as Animatable from 'react-native-animatable';
import {
  useLoggedIn,
  useLoggedInUser,
  allUsers,
} from '../store/selectors/selectors';
const HomeScreen = ({navigation}: Navigation) => {
  const loggedInUser = useLoggedInUser();
  const users = allUsers();
  const navigateToUserDetails = (user: User) => {
    navigation.navigate('UserDetailsScreen', {user});
  };

  return (
    <DrawerContent navigation={navigation} user={loggedInUser}>
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
          <Text style={styles.text_header}>All Registered Users</Text>
          {users && users.length > 0 && (
            <FlatList
              data={users}
              scrollEnabled
              keyExtractor={(item: User) => item.email}
              renderItem={({item}: {item: User}) => (
                <TouchableOpacity onPress={() => navigateToUserDetails(item)}>
                  <View style={styles.userList}>
                    <Text style={styles.userListItem}>{item.user_name}</Text>
                    <Text style={styles.userListItem}>{item.email}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </Animatable.View>
      </View>
    </DrawerContent>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 0,
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#009387',
    fontWeight: 'bold',
    fontSize: 30,
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
