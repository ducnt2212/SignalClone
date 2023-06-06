import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
/** Just for the UI */
import {Button, Input, Image} from '@rneui/themed';

import {auth} from '../firebase';

function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        navigation.reset({index: 0, routes: [{name: 'Home'}]});
      }
    });

    return unsubcribe;
  }, [navigation]);

  function SignIn() {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => console.log(error.message));
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 50}>
      <StatusBar barStyle="light-content" />
      <Image
        style={{width: 200, height: 200}}
        source={{
          uri: 'data:image/jpeg;base64,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',
        }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button containerStyle={styles.button} onPress={SignIn} title="Login" />
      <Button
        onPress={() => navigation.navigate('Register')}
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
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
