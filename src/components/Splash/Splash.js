import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  ImageBackground,
  navigate,
  AsyncStorage,
  StatusBar
} from 'react-native';
import Spinner from 'react-native-spinkit';
import SplashImage from '../../assets/art-prizes-splash.jpg';

import { Navigator } from '../../../src/index';

export default class Splash extends PureComponent {
  componentWillMount() {
    StatusBar.setHidden(true);
  }
  render() {
    const token = AsyncStorage.getItem('user');

    const StackNavigation = Navigator(token != null);

    return (
      <View style={styles.container}>
        <Image
          style={{
            width: '90%',
            height: '90%',
            resizeMode: 'contain',
            borderColor: '#4527A0'
          }}
          source={SplashImage}
        />
        <Text> Version 3.0.25 </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});
