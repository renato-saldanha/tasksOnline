import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AuthOrApp extends Component {
  async componentDidMount() {
    const dadosUsuarioJson = await AsyncStorage.getItem('dadosUsuario');
    const dadosUsuario = JSON.parse(dadosUsuarioJson);

    if (dadosUsuario && dadosUsuario.token) {
      axios.defaults.headers.common['Authorization'] = `bearer ${dadosUsuario.token}`;
      this.props.navigation.navigate('Home', dadosUsuario);
    } else {
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
