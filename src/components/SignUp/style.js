import { StyleSheet } from 'react-native';
import withWidth from 'material-ui/utils/withWidth';

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    margin: 5,
    borderColor: '#fff',
    borderBottomColor: '#95989A',
    borderBottomWidth: 0.5,
    padding: 3,
    alignSelf: 'center',
  },
  icons: {
    margin: 10,
    color: '#231F20',
  },
  input: {
    paddingLeft: 5,
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    color: '#231F20',
    width: 200,
  },
  buttonContainer: {
    borderRadius: 20,
    borderColor: 'white',
    alignItems: 'center',
    width: 265,
    height: 50,
    backgroundColor: 'white',
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
    fontSize: 12,
    height: 15,
    textAlign: 'center',
  },
  error: {
    borderWidth: 1,
    borderColor: 'red',
  },
}));
