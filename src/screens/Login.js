import React, {Component} from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';

import loginImagem from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';

export default class Login extends Component {
  render() {
    return (
      <ImageBackground style={styles.background} source={loginImagem}>
        <View>
          <Text style={styles.title}>Email</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
});
