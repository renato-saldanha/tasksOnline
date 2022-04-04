import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';
import 'moment/locale/pt-br';

import commonStyles from '../commonStyles.js';
import TodayImage from '../../assets/imgs/today.jpg';
import Task from '../components/Task';
import AdicionarTask from './AdicionarTask';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const initialState = {
  mostrarTasksConcluidas: true,
  mostrarAdicionarTask: false,
  tasksVisiveis: [],
  tasks: [],
};

export default class TaskList extends Component {
  state = {...initialState};

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

    return (
      <SafeAreaView style={styles.container}>
        <AdicionarTask
          isVisible={this.state.mostrarAdicionarTask}
          onCancel={() => this.setState({mostrarAdicionarTask: false})}
          onSave={this.addTask}
        />

        <ImageBackground source={TodayImage} style={styles.background}>
          <View style={styles.seeUnsee}>
            <TouchableWithoutFeedback
              onPress={this.marcarDesmarcarVisibilidade}>
              <Icon
                name={this.state.mostrarTasksConcluidas ? 'eye-slash' : 'eye'}
                size={20}
                color="#FFD9"
              />
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.titlebar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subTitle}>{today}</Text>
          </View>
        </ImageBackground>

        <View style={styles.taskList}>
          <FlatList
            data={this.state.tasksVisiveis}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
              <Task
                {...item}
                {...this.state}
                verificarMarcacaoTask={this.verificarMarcacaoTask}
                deleteTask={this.deleteTask}
                /* Comunicação indireta */
              />
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.touchIncluirTask}
          onPress={() => this.setState({mostrarAdicionarTask: true})}
          activeOpacity={0.7}>
          <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  addTask = newTask => {
    if (newTask.descricao && newTask.descricao.trim()) {
      let tasks = [...this.state.tasks];

      tasks.push({
        id: newTask.id,
        descricao: newTask.descricao,
        dataEstimada: newTask.dataEstimada,
        dataConclusao: null,
      });

      this.setState(
        {tasks, mostrarAdicionarTask: false},
        this.mostrarOcultarTasksConcluidas,
      );
    } else {
      Alert.alert('Alerta', 'Descrição inválida!', [{text: 'OK'}]);
      return;
    }
  };

  deleteTask = id => {
    let tasks = [...this.state.tasks];
    let indexItem = tasks.map(f => f.id).indexOf(id);
    tasks.splice(indexItem, 1);
    this.setState({tasks}, this.mostrarOcultarTasksConcluidas);
  };

  marcarDesmarcarVisibilidade = () => {
    this.setState(
      {mostrarTasksConcluidas: !this.state.mostrarTasksConcluidas},
      this.mostrarOcultarTasksConcluidas,
    );
  };

  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('state');
    const state = JSON.parse(stateString) || initialState;
    this.setState(state, this.mostrarOcultarTasksConcluidas);
  };

  mostrarOcultarTasksConcluidas = () => {
    let tasksVisiveis = null;

    if (this.state.mostrarTasksConcluidas) {
      tasksVisiveis = this.state.tasks;
    } else {
      tasksVisiveis = this.state.tasks.filter(t => t.dataConclusao === null);
    }

    this.setState({tasksVisiveis});

    AsyncStorage.setItem('state', JSON.stringify(this.state));
  };

  /* Comunicação indireta */
  verificarMarcacaoTask = id => {
    const tasks = [...this.state.tasks];
    tasks.forEach(t => {
      if (t.id === id && t.dataConclusao === null) {
        t.dataConclusao = new Date();
      } else if (t.id === id && t.dataConclusao !== null) {
        t.dataConclusao = null;
      }
    });
    this.setState({tasks}, this.mostrarOcultarTasksConcluidas);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titlebar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 50,
    color: commonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    color: commonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 30,
  },
  seeUnsee: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 15,
  },
  touchIncluirTask: {
    position: 'absolute',
    opacity: 0.9,
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
