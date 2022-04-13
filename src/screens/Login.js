import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';

import loginImagem from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';
import AuthInput from '../components/AuthInput';
import {server, mostrarErro, sucesso} from '../common';

const initialState = {
  nome: '',
  email: 'ranalisesaldanha@gmail.com',
  senha: '123456',
  confirmacaoSenha: '',
  novoUsuario: false,
};

export default class Login extends Component {
  state = {
    ...initialState,
  };

  entrarOuCadastrar = () => {
    this.state.novoUsuario ? this.cadastrar() : this.logar();
  };

  formValidado = () => {
    return this.state.email.contains('@') && this.state.senha.length() >= 6;
  };

  cadastrar = async () => {
    if (this.state.senha !== this.state.confirmacaoSenha) {
      mostrarErro('As senhas não conferem, favor verificar');
      return;
    }

    await axios
      .post(`${server}/cadastrar`, {
        nome: this.state.nome,
        email: this.state.email,
        senha: this.state.senha,
      })
      .then(res => {
        sucesso('Usuário cadastrado com sucesso!');
        this.state.setState({...initialState});
      })
      .catch(e => mostrarErro(e));
  };

  logar = () => {
    axios
      .post(`${server}/logar`, {
        email: this.state.email,
        senha: this.state.senha,
      })
      .then(res => {
        axios.defaults.headers.common[
          'Authorization'
        ] = `bearer ${res.data.token}`;
        this.props.navigation.navigate('Home');
      })
      .catch(e => mostrarErro(`Login não autorizado, erro:${e}`));
  };

  render() {
    return (
      <ImageBackground style={styles.background} source={loginImagem}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subTitle}>
            {this.state.novoUsuario ? 'Crie sua conta' : 'Informe os dados'}
          </Text>
          {this.state.novoUsuario && (
            <AuthInput
              icon="user"
              style={styles.input}
              placeholder="Nome"
              value={this.state.nome}
              onChangeText={nome => this.setState({nome})}
            />
          )}
          <AuthInput
            icon="at"
            style={styles.input}
            placeholder="Email"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
          <AuthInput
            icon="lock"
            style={styles.input}
            placeholder="Senha"
            value={this.state.senha}
            onChangeText={senha => this.setState({senha})}
            secureTextEntry={true}
          />
          {this.state.novoUsuario && (
            <AuthInput
              icon="asterisk"
              style={styles.input}
              placeholder="Confirmar senha"
              value={this.state.confirmacaoSenha}
              onChangeText={confirmacaoSenha =>
                this.setState({confirmacaoSenha})
              }
            />
          )}
          <TouchableOpacity onPress={this.entrarOuCadastrar}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                {this.state.novoUsuario ? 'Cadastrar' : 'Entrar'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.setState({novoUsuario: !this.state.novoUsuario})}>
          <Text style={styles.buttonText} color="#FFF">
            {!this.state.novoUsuario ? 'Não possuí conta?' : 'Já possuí conta?'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
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
  subTitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    width: '90%',
  },
  input: {
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
