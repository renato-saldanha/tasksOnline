import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Login from './screens/Login';
import TaskList from './screens/TaskList';

const rotasPrincipais = {
  Login: {
    nome: 'Login',
    screen: Login,
  },
  TaskList: {
    nome: 'TaskList',
    screen: TaskList,
  },
};

const navegadorPrincipal = createSwitchNavigator(rotasPrincipais, {
  nomeRotaInicial: 'Login',
});

export default createAppContainer(navegadorPrincipal);
