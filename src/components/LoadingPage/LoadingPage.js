import React, { PureComponent } from 'react';
import styles from './style';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Picker,
  navigate
} from 'react-native';

export default class LoadingPage extends PureComponent {
  render() {
    return (
      <View>
        <Text> Loading... </Text>
      </View>
    );
  }
}
