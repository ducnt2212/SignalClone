import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import CustomListItem from '../components/CustomListItem';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
/** Just for the UI */
import {Avatar} from '@rneui/themed';

import {auth, db} from '../firebase';
import {TouchableOpacity} from 'react-native-gesture-handler';

function HomeSCreen() {
  const [chats, setChats] = useState([]);

  const navigation = useNavigation();

  const SignOut = () => {
    auth.signOut().then(() => {
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    });
  };

  useEffect(() => {
    const unsubcribe = db.collection('chats').onSnapshot(snapshot => {
      setChats(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });

    return unsubcribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: {backgroundColor: '#fff'},
      headerTitleStyle: {color: 'black'},
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{marginLeft: 12.5}}>
          <TouchableOpacity onPress={() => SignOut()} activeOpacity={0.5}>
            <Avatar rounded source={{uri: auth?.currentUser?.photoURL}} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 20,
          }}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddChat')}
            activeOpacity={0.5}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function enterChat(id, chatName) {
    navigation.navigate('Chat', {
      id,
      chatName,
    });
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({id, data: {chatName}}) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeSCreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
