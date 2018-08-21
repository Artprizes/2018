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
import { StatusBar } from 'react-native';
import { Navigator } from './src/index.js';

export default class App extends PureComponent {
  componentWillMount() {
    StatusBar.setHidden(true);
  }
  render() {
    const token = AsyncStorage.getItem('user');

    const StackNavigation = Navigator(token != null);

    return (
      <View style={styles.container}>
        <StackNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
