import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Gravatar from 'react-native-gravatar';

export default props => {
  return (
    <DrawerContentScrollView>
      <View style={styles.header}>
        <Gravatar
          style={styles.avatar}
          options={{email: props.email, secure: true}}
          size={20}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  avatar: {
    width: 60,
    height: 60,
  },
});
