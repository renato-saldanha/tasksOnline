import {Alert} from 'react-native';

const server = 'http://10.1.11.77:3000';

function mostrarErro(err) {
  Alert.alert('Ocorreu um problema!', `${err}`);
}

function sucesso(msg) {
  Alert.alert('Sucesso!', msg);
}

export {server, mostrarErro, sucesso};
