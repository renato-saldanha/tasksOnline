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
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import moment from 'moment';
import 'moment/locale/pt-br';

import commonStyles from '../commonStyles.js';
import TodayImage from '../../assets/imgs/today.jpg';
import Tomorrow from '../../assets/imgs/tomorrow.jpg';
import Week from '../../assets/imgs/week.jpg';
import Month from '../../assets/imgs/month.jpg';
import Task from '../components/Task';
import AdicionarTask from './AdicionarTask';
import {server, mostrarErro, sucesso} from '../common';

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

  componentDidMount() {
    this.getTasks();
  }

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

    return (
      <SafeAreaView style={styles.container}>
        <AdicionarTask
          isVisible={this.state.mostrarAdicionarTask}
          onCancel={() => this.setState({mostrarAdicionarTask: false})}
          onSave={this.addTask}
        />

        <ImageBackground source={this.getImage()} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon
                name="bars"
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
            <TouchableWithoutFeedback
              onPress={this.marcarDesmarcarVisibilidade}>
              <Icon
                name={this.state.mostrarTasksConcluidas ? 'eye' : 'eye-slash'}
                size={30}
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
                verificarMarcacaoTask={this.verificarMarcacaoTask}
                deleteTask={this.deleteTask}
              />
            )}
          />
        </View>

        <TouchableOpacity
          style={[styles.touchIncluirTask, {backgroundColor: this.getColor()}]}
          onPress={() => this.setState({mostrarAdicionarTask: true})}
          activeOpacity={0.7}>
          <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  getTasks = async () => {
    const maxData = moment()
      .add({days: this.props.diasAFrente})
      .format('YYYY-MM-DD 23:59:59');
    await axios
      .get(`${server}/tasks?date=${maxData}`)
      .then(tasks =>
        this.setState({tasks: tasks.data}, this.mostrarOcultarTasksConcluidas),
      )
      .catch(err => mostrarErro(err));
  };

  getImage = () => {
    switch (this.props.diasAFrente) {
      case 0:
        return TodayImage;
      case 1:
        return Tomorrow;
      case 7:
        return Week;
      default:
        return Month;
    }
  };

  getColor = () => {
    switch (this.props.diasAFrente) {
      case 0:
        return commonStyles.colors.today;
      case 1:
        return commonStyles.colors.tomorrow;
      case 7:
        return commonStyles.colors.week;
      default:
        return commonStyles.colors.month;
    }
  };

  addTask = async newTask => {
    if (newTask.descricao && newTask.descricao.trim()) {
      await axios
        .post(`${server}/tasks`, {
          descricao: newTask.descricao,
          dataEstimada: newTask.dataEstimada,
          dataConclusao: null,
        })
        .then(_ => {
          this.setState({mostrarAdicionarTask: false});
          sucesso('Dados gravados com sucesso!');
          this.getTasks();
        })
        .catch(e => mostrarErro(e));
    } else {
      Alert.alert('Alerta', 'Descrição inválida!', [{text: 'OK'}]);
    }
  };

  marcarDesmarcarVisibilidade = () => {
    this.setState(
      {mostrarTasksConcluidas: !this.state.mostrarTasksConcluidas},
      this.mostrarOcultarTasksConcluidas,
    );
  };

  deleteTask = id => {
    axios
      .delete(`${server}/tasks/${id}`)
      .then(_ => this.getTasks())
      .catch(e => mostrarErro(e));
  };

  verificarMarcacaoTask = id => {
    axios
      .put(`${server}/tasks/${id}/alterar`)
      .then(_ => this.getTasks())
      .catch(e => mostrarErro(e));
  };

  mostrarOcultarTasksConcluidas = () => {
    let tasksVisiveis = null;

    if (this.state.mostrarTasksConcluidas) {
      tasksVisiveis = this.state.tasks;
    } else {
      tasksVisiveis = this.state.tasks.filter(t => t.dataconclusao === null);
    }

    this.setState({tasksVisiveis});
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
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
  touchIncluirTask: {
    position: 'absolute',
    opacity: 0.9,
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
