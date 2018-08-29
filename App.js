import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  navigate,
  AsyncStorage
} from 'react-native';
import Spinner from 'react-native-spinkit';
import Login from './src/components/Login/';
import LandingPage from './src/components/LandingPage/';
import Splash from './src/components/Splash';
import { StatusBar } from 'react-native';
import { Navigator } from './src/index.js';

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      timePassed: false
    };
  }
  componentWillMount() {
    StatusBar.setHidden(true);
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({ timePassed: true });
    }, 3000);
  }

  render() {
    const token = AsyncStorage.getItem('user');

    const StackNavigation = Navigator(token != null);

    if (!this.state.timePassed) {
      return <Splash />;
    }
    return <StackNavigation />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
