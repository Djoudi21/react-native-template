import {useRef, useState} from 'react';
import {LoginUseCase} from '../use-cases/loginUseCase/loginUseCase';
import {RegisterUseCase} from '../use-cases/registerUseCase/registerUseCase';
import {InMemoryUserRepository} from '../repositories/inMemoryUserRepository';
import {useDispatch} from 'react-redux';
import {setTokens} from '../store/userSlice';

export default function useAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [formSubmissionErrorMessage, setFormSubmissionErrorMessage] =
    useState('');
  const dispatch = useDispatch();
  const userRepository = new InMemoryUserRepository();
  const loginUseCase = new LoginUseCase(userRepository);
  const registerUseCase = new RegisterUseCase(userRepository);
  const emailTextInputRef = useRef(null);
  const passwordTextInputRef = useRef(null);
  async function handleLogin(navigation: any) {
    // if (emailTextInputRef.current) {
    //   // @ts-ignore
    //   emailTextInputRef.current.blur();
    // }
    //
    // if (passwordTextInputRef.current) {
    //   // @ts-ignore
    //   passwordTextInputRef.current.blur();
    // }

    // emailValidation();
    // passwordValidation();
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    const credentials = {
      email,
      password,
    };
    try {
      const res = await loginUseCase.login(credentials);
      if (!res.tokens) {
        return null;
      }
      const tokens = res.tokens;
      dispatch(setTokens(tokens));
      navigation.push('Tab');
    } catch (e) {
      // @ts-ignore
      const errorMessage = setSubmissionErrorMessage(e.response.data.message);
      setFormSubmissionErrorMessage(errorMessage);
    }
  }

  async function handleRegister(navigation: any) {
    // if (emailTextInputRef.current) {
    //   // @ts-ignore
    //   emailTextInputRef.current.blur();
    // }
    //
    // if (passwordTextInputRef.current) {
    //   // @ts-ignore
    //   passwordTextInputRef.current.blur();
    // }

    // emailValidation();
    // passwordValidation();
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    const credentials = {
      email,
      password,
    };
    try {
      await registerUseCase.register(credentials);
      const res = await loginUseCase.login(credentials);
      if (!res.tokens) {
        return null;
      }
      const tokens = res.tokens;
      dispatch(setTokens(tokens));
      navigation.push('Tab');
    } catch (e) {
      // @ts-ignore
      const errorMessage = setSubmissionErrorMessage(e.response.data.message);
      setFormSubmissionErrorMessage(errorMessage);
    }
  }

  // function emailValidation() {
  //   if (!email.length) {
  //     setIsEmailValid(false);
  //     setEmailErrorMessage('Please enter an email');
  //     return;
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
  //     setIsEmailValid(false);
  //     setEmailErrorMessage('Email is not valid');
  //     return;
  //   } else {
  //     setIsEmailValid(true);
  //   }
  // }

  // function passwordValidation() {
  //   if (!password.length) {
  //     setIsPasswordValid(false);
  //     setPasswordErrorMessage('Please enter a paswword');
  //     return;
  //   } else {
  //     setIsPasswordValid(true);
  //   }
  // }

  function setSubmissionErrorMessage(message: string): string {
    switch (message) {
      default:
        return "Aucun utilisateur n'a été trouvé";
    }
  }

  function handleRedirect(routeName: string, navigation: any) {
    navigation.push(routeName);
  }

  // function handleFocusEmailInput() {
  //   setEmail('');
  //   setFormSubmissionErrorMessage('');
  // }

  function handleFocusPasswordInput() {
    setPassword('');
    setFormSubmissionErrorMessage('');
  }

  return {
    handleLogin,
    handleRegister,
    // emailValidation,
    // passwordValidation,
    handleRedirect,
    handleFocusPasswordInput,
    // handleFocusEmailInput,
    emailErrorMessage,
    passwordErrorMessage,
    emailTextInputRef,
    passwordTextInputRef,
    email,
    setEmail,
    password,
    setPassword,
    isEmailValid,
    isPasswordValid,
    formSubmissionErrorMessage,
  };
}
