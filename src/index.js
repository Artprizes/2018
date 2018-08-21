import React from 'react';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import Login from './components/Login/';
import LandingPage from './components/LandingPage';
import ResetPassword from './components/ResetPassword/';
import SignUp from './components/SignUp/';
import DrawerStack from './stacks/drawerStack.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Loading from './Loading';

const AuthStack = StackNavigator(
  {
    LandingPage: {
      screen: LandingPage,
      navigationOptions: {
        title: 'Back',
        drawerIcon: <MaterialIcon name="home" size={30} color="white" />,
        drawerLockMode: 'locked-closed',
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: 'Sign Up',
        drawerIcon: <FontAwesome name="sign-in" size={30} color="white" />,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Log In',
        drawerIcon: <MaterialIcon name="input" size={30} color="white" />,
      },
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        title: 'Reset Password',
        drawerIcon: <MaterialIcon name="input" size={30} color="white" />,
      },
    },
  },
  {
    initialRouteName: 'LandingPage',
    // headerMode: "none"
  },
);

export const Navigator = (isLoggedIn) => SwitchNavigator(
    {
      auth: { screen: AuthStack },
      app: { screen: DrawerStack },
      loading: { screen: Loading }
    },
    {
      initialRouteName: "loading",
      headerMode: "none"
    }
  );
