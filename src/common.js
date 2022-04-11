import {Alert} from 'react-native';

const server = 'http://192.168.100.3:3000';

function mostrarErro(err) {
  Alert.alert('Ocorreu um problema!', `${err}`);
}

function sucesso(msg) {
  Alert.alert('Sucesso!', msg);
}

export {server, mostrarErro, sucesso};
