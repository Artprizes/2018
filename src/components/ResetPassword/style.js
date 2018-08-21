import { StyleSheet } from 'react-native';

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#3B5998',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    borderColor: '#fff',
    borderBottomColor: '#95989A',
    borderBottomWidth: 0.5,
    margin: 15,
    maxWidth: 300,
  },

  icons: {
    margin: 10,
    color: '#231F20',
  },

  input: {
    paddingLeft: 10,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#231F20',
    width: 200,
  },

  buttonContainer: {
    borderRadius: 20,
    borderColor: 'white',
    width: 265,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    color: 'white',
  },
  errorMsg: {
    color: '#D1233E',
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    textAlign: 'center',
  },
}));
