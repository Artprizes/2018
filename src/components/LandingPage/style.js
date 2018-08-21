import { StyleSheet } from 'react-native';

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emailText: {
    color: 'white',
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    textAlign: 'center',
    padding: 15,
  },
  loginText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    textAlign: 'center',
    padding: 15,
    color: 'white',
  },
}));
