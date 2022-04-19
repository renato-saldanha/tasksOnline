import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Gravatar} from 'react-native-gravatar';

import commonStyles from '../commonStyles';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default props => {
  const deslogar = () => {
    delete axios.defaults.headers.common['Authorization'];
    AsyncStorage.removeItem('dadosUsuario');
    props.navigation.navigate('AuthOrApp');
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <Gravatar
          style={styles.avatar}
          options={{email: props.email, secure: true}}
          size={20}
        />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.nome}>{props.nome}</Text>
        <Text style={styles.email}>{props.email}</Text>
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity style={styles.logout} onPress={deslogar}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="sign-out" size={30} color="#800" />
          <Text style={styles.textoLogout}>Deslogar</Text>
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  title: {
    color: '#000',
    fontFamily: commonStyles.fontFamily,
    fontSize: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 30,
    margin: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  nome: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    color: commonStyles.colors.mainText,
    marginBottom: 5,
  },
  email: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 15,
    color: commonStyles.colors.subText,
    marginBottom: 10,
  },
  iconeSair: {
    marginLeft: 10,
    marginBottom: 10,
  },
  logout: {
    marginLeft: 20,
    marginTop: '40%',
  },
  textoLogout: {
    margin: 5,
  },
});
