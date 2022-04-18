import React from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from './screens/Login';
import TaskList from './screens/TaskList';
import Menu from './screens/Menu';
import commonStyles from './commonStyles';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MenuStackNavigator = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={menuConfig}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={_ => {
            return {title: 'Login'};
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeDrawer}
          options={props => {
            return {title: 'Home'};
          }}>
          {/* {props => <HomeDrawer {...props} />} */}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeDrawer = props => {
  const {nome, email} = props.route.params;
  return (
    <Drawer.Navigator
      screenOptions={menuConfig}
      drawerContent={props => <Menu {...props} nome={nome} email={email} />}>
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
  return <MenuStackNavigator {...props} />;
};

const menuConfig = {
  headerShown: false,
  labelStyle: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: 'normal',
    fontSize: 20,
  },
  activeLabelStyle: {
    colors: '#080',
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
