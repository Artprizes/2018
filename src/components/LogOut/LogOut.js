import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  AsyncStorage,
  navigate,
} from 'react-native';
import { authDiscardToken } from '../../actions/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LogOut extends Component {
  componentDidMount() {
    try {
      AsyncStorage.removeItem('user');
      this.props.navigation.navigate('auth');
    } catch (err) {
      alert(err);
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return <Text>Logout</Text>;
  }
}

function mapStateToProps(state) {
  return {};
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ authDiscardToken }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps,
)(LogOut);
