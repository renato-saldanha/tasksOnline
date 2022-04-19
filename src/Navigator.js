import React from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from './screens/Login';
import TaskList from './screens/TaskList';
import Menu from './screens/Menu';
import AuthOrApp from './screens/AuthOrApp';
import commonStyles from './commonStyles';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MenuStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={menuConfig} initialRouteName="AuthOrApp">
        <Stack.Screen name="AuthOrApp" component={AuthOrApp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeDrawer = props => {
  const {nome, email} = props.route.params;

  return (
    <Drawer.Navigator
      screenOptions={menuConfig}
      drawerContent={props => <Menu {...props} email={email} nome={nome} />}>
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

export default () => {
  return <MenuStackNavigator />;
};

const menuConfig = {
  headerShown: false,
  labelStyle: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: 'normal',
    fontSize: 20,
  },
  activeTintColor: '#080',
};
