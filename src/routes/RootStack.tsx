import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home';
import {Login} from '../screens/Login';
import {Register} from '../screens/Register';
import {useSelector} from 'react-redux';
import {Text} from 'react-native';

const RootStack = createNativeStackNavigator();

export function RootStackRouter() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const tokens = useSelector((state: any) => state.user.tokens);

  useEffect(() => {
    async function checkTokensAndSetNavigation() {
      try {
        if (tokens.accessToken !== null) {
          setInitialRoute('Home');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        setInitialRoute('Login');
      }
    }

    checkTokensAndSetNavigation().then();
  }, []);

  return initialRoute !== null ? (
    <RootStack.Navigator initialRouteName={initialRoute as 'Login' | 'Home'}>
      <RootStack.Group>
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  ) : (
    <Text>Loading</Text>
  );
}
