import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
/** Just for the UI */
import {Avatar} from '@rneui/themed';

import {auth, db, firebase} from '../firebase';

function ChatScreen() {
  const [input, setInput] = useState();

  const [messages, setMessages] = useState([]);

  const navigation = useNavigation();

  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'left',
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoURL ||
                'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
            }}
          />
          <Text style={{color: 'white', marginLeft: 10, fontWeight: '700'}}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 10}}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20,
          }}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [messages, navigation, route.params.chatName]);

  function sendMessage() {
    Keyboard.dismiss();

    db.collection('chats').doc(route.params.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput('');
  }

  useLayoutEffect(() => {
    const unsubcribe = db
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );

    return unsubcribe;
  }, [route]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={85}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <>
            <ScrollView style={{paddingTop: 15, transform: [{scaleY: -1}]}}>
              {messages.map(({id, data}) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.receiver}>
                    <Avatar
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        right: -5,
                      }}
                      rounded
                      size={30}
                      source={{uri: data.photoURL}}
                    />
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      containerStyle={{
                        position: 'absolute',
                        bottom: -15,
                        left: -5,
                      }}
                      rounded
                      size={30}
                      source={{uri: data.photoURL}}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                ),
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Signal Message"
                style={styles.textInput}
                value={input}
                onChangeText={setInput}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2b68e6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  receiver: {
    padding: 15,
    backgroundColor: '#ececec',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative',
    transform: [{scaleY: -1}],
  },

  sender: {
    padding: 15,
    backgroundColor: '#2b68e6',
    alignSelf: 'flex-start',
    borderRadius: 20,
    margin: 15,
    maxWidth: '80%',
    position: 'relative',
    transform: [{scaleY: -1}],
  },

  senderText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 15,
  },

  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: 'white',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },

  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    paddingLeft: 10,
    marginRight: 15,
    backgroundColor: '#ececec',
    color: 'gray',
    borderRadius: 30,
  },
});
