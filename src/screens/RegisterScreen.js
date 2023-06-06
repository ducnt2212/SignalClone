import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
/** Just for the UI */
import {Button, Input, Text} from '@rneui/themed';

import {auth} from '../firebase';

function RegisterScreen() {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [imageUrl, setImageUrl] = useState('');

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    });
  }, [navigation]);

  function Register() {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
        });
      })
      .catch(error => Alert.alert(error.message));
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 50}>
      <StatusBar barStyle="light-content" />
      <Text h3 style={{marginBottom: 50}}>
        Create a Signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          textContentType="name"
          value={name}
          onChangeText={setName}
        />
        <Input
          placeholder="Email"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          textContentType="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          textContentType="URL"
          value={imageUrl}
          onChangeText={setImageUrl}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        onPress={Register}
        title="Register"
      />
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },

  inputContainer: {
    width: 300,
  },

  button: {
    width: 200,
    marginTop: 10,
  },
});
