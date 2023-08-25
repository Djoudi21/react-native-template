import {Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import React from 'react';
import useAuth from '../hooks/useAuth';

export function Register({navigation}: any) {
  const auth = useAuth();
  return (
    <SafeAreaView>
      <View>
        <Text>Inscrivez-vous</Text>
        <View>
          <TextInput
            ref={auth.emailTextInputRef}
            placeholder="Email"
            onChangeText={auth.setEmail}
            value={auth.email}
          />
          {!auth.isEmailValid && (
            <View>
              <Text>{auth.emailErrorMessage}</Text>
            </View>
          )}
        </View>
        <View>
          <TextInput
            ref={auth.passwordTextInputRef}
            // onBlur={() => auth.passwordValidation()}
            placeholder="Password"
            onFocus={auth.handleFocusPasswordInput}
            onChangeText={auth.setPassword}
            value={auth.password}
            secureTextEntry={true}
          />
          {!auth.isPasswordValid && (
            <View>
              <Text>{auth.passwordErrorMessage}</Text>
            </View>
          )}
        </View>

        <Pressable onPress={() => auth.handleRegister(navigation)}>
          <Text>Validez</Text>
        </Pressable>

        {auth.formSubmissionErrorMessage
          ? auth.isEmailValid &&
            auth.isPasswordValid && (
              <Text>{auth.formSubmissionErrorMessage}</Text>
            )
          : null}

        <View>
          <Text>Déja un compte ?</Text>
          <Pressable onPress={() => auth.handleRedirect('Login', navigation)}>
            <Text>Connectez-vous</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
