import React, {Component} from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import commonStyles from '../commonStyles';
import moment from 'moment';
import 'moment/locale/pt-br';

const initialState = {
  descricao: '',
  dataEstimada: new Date(),
  mostrarDatePicker: false,
};

export default class AdicionarTask extends Component {
  state = {...initialState};

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="slide">
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>

        <View style={styles.container}>
          <Text style={styles.header}>Nova Tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="Informe a descrição da tarefa"
            value={this.state.descricao}
            onChangeText={descricao => this.setState({descricao})}
          />

          {this.getDatePicker(true)}

          <View style={styles.botoes}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.botao}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.botao}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  save = () => {
    const newTask = {
      id: Math.random(),
      descricao: this.state.descricao,
      dataEstimada: this.state.dataEstimada,
    };

    // condicional resumida: (true) => expressão
    this.props.onSave && this.props.onSave(newTask);
    this.setState({...initialState});
  };

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={this.state.dataEstimada}
        onChange={(_, dataEstimada) =>
          this.setState({dataEstimada, mostrarDatePicker: false})
        }
        mode="date"
      />
    );

    if (Platform.OS === 'android') {
      datePicker = (
        <View style={[styles.input, styles.data]}>
          <TouchableOpacity
            onPress={() => this.setState({mostrarDatePicker: true})}>
            <Text>
              {moment(this.state.dataEstimada).format(
                'ddd, D [de] MMMM [de] YYYY',
              )}
            </Text>
          </TouchableOpacity>
          {/* condicional resumida: (true) => expressão*/}
          {this.state.mostrarDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    backgroundColor: '#FFF',
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: 'center',
    fontSize: 15,
    padding: 15,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    height: 40,
    margin: 15,
    marginBottom: 5,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 6,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  botao: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
  },
  data: {
    fontSize: 20,
    justifyContent: 'center',
  },
});
