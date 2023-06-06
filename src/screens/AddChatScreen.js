import React, {useLayoutEffect, useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
/** Just for the UI */
import {Button, Input} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {auth, db} from '../firebase';

function AddChatScreen() {
  const [input, setInput] = useState('');

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a new chat',
      headerBackTitle: 'Chats',
    });
  }, [navigation]);

  async function createChat() {
    await db
      .collection('chats')
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch(error => console.log(error));
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={setInput}
        leftIcon={<Icon name="wechat" size={24} color="black" />}
      />
      <Button onPress={createChat} title="Create new chat" />
    </View>
  );
}

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 30,
    height: '100%',
  },
});
