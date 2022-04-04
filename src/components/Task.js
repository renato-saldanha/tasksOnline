import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

import commonStyles from '../commonStyles';

import moment from 'moment';
import 'moment/locale/pt-br';

export default props => {
  const estiloConcluidoOuNao =
    props.dataConclusao != null ? {textDecorationLine: 'line-through'} : {};

  const data = props.dataConclusao ? props.dataConclusao : props.dataEstimada;
  const dataFormatada = moment(data)
    .locale('pt-br')
    .format('ddd, D [de] MMMM [de] YYYY');

  const confirmDelete = () => {
    Alert.alert(
      'Confirmação de exclusão.',
      'Deseja realmente deletar este registro?',
      [
        {
          text: 'Sim',
          onPress: () => props.deleteTask && props.deleteTask(props.id),
        },
        {text: 'Não'},
      ],
    );
  };

  const renderRight = (progress, dragX) => {
    return (
      <TouchableOpacity
        style={styles.buttonDeleteRight}
        onPress={() => confirmDelete()}>
        <Icon name="trash" size={20} color="#FFF" />
      </TouchableOpacity>
    );
  };

  const renderLeft = (progress, dragX) => {
    return (
      <View style={styles.buttonDeleteLeft}>
        <Icon name="trash" size={20} color="#FFF" />
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={renderRight}
        renderLeftActions={renderLeft}
        onSwipeableOpen={s => {
          s === 'left' && props.deleteTask(props.id);
        }}>
        <View style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => props.verificarMarcacaoTask(props.id)}>
            <View style={styles.checkContainer}>
              {getCheckView(props.dataConclusao)}
            </View>
          </TouchableWithoutFeedback>
          <View>
            <Text style={[styles.descricao, estiloConcluidoOuNao]}>
              {props.descricao}
            </Text>
            <Text style={styles.data}>{dataFormatada}</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

function getCheckView(dataConclusao) {
  let view;
  if (dataConclusao != null) {
    view = (
      <View style={styles.concluido}>
        <Icon name="check" size={20} color="#FFF" />
      </View>
    );
  } else {
    view = <View style={styles.pendente} />;
  }
  return view;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendente: {
    height: 25,
    width: 25,
    borderWidth: 1,
    borderRadius: 13,
    borderColor: '#555',
  },
  concluido: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: '#4D7F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descricao: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },
  data: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12,
  },
  buttonDeleteRight: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 18,
    width: 50,
  },
  buttonDeleteLeft: {
    width: '45%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
