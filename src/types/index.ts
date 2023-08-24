import type {NativeStackScreenProps} from '@react-navigation/native-stack';
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};
export type LoginNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export type RegisterNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;
