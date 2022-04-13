import React, {Component} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from './screens/Login';
import TaskList from './screens/TaskList';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MenuStackNavigator = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={({navigation}) => {
            return {title: 'Login'};
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeDrawer}
          options={({navigation}) => {
            return {title: 'Home'};
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeDrawer = _ => {
  return (
    <Drawer.Navigator screenOptions={screenOptions}>
      <Drawer.Screen name="Hoje" options={{title: 'Hoje'}}>
        {props => <TaskList {...props} title="Hoje" diasAFrente={0} />}
      </Drawer.Screen>
      <Drawer.Screen name="Amanha" options={{title: 'Amanhã'}}>
        {props => <TaskList {...props} title="Amanhã" diasAFrente={1} />}
      </Drawer.Screen>
      <Drawer.Screen name="Semana" options={{title: 'Semana'}}>
        {props => <TaskList {...props} title="Semana" diasAFrente={7} />}
      </Drawer.Screen>
      <Drawer.Screen name="Mes" options={{title: 'Mês'}}>
        {props => <TaskList {...props} title="Mês" diasAFrente={30} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default props => {
  return (
    <SafeAreaView style={styles.container}>
      <MenuStackNavigator {...props} />
    </SafeAreaView>
  );
};

const screenOptions = {
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTintColor: '#fff',
  headerTintStyle: {
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
