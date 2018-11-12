import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default class LoadingPage extends PureComponent {
  componentWillMount() {
    setInterval(() => {
      this.props.navigation('Home');
    }, 4000);
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Planner ... V 3.0.33 </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'red',
    fontSize: 24
  },
  img: {
    width: 150,
    height: 60,
    alignSelf: 'center'
  }
});
