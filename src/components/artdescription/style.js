import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flexDirection: 'row'
  },
  image: {
    borderRadius: 28,
    width: '100%',
    height: 50
  },
  footer: { backgroundColor: '#F5F5F5' },
  title: {
    color: '#007AFF',
    flexGrow: 1,
    flexShrink: 1,
    lineHeight: 45,
    fontFamily: 'OpenSans-Regular',
    fontSize: 16
  },
  titleContents: {
    color: '#444',
    flexGrow: 1,
    flexShrink: 1,
    marginRight: 120,
    fontFamily: 'OpenSans-Regular',
    fontSize: 16
  },
  numbers: {
    width: 40,
    padding: 1,
    color: '#bdc3c7'
  },

  icons: {
    color: '#5D5D5F',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 40,
    marginTop: 15,
    marginLeft: 50,
    marginRight: 10
  },
  shareText: {
    fontSize: 20,
    margin: 10
  },
  values: {
    color: 'red'
  },
  intendToEnterText: {
    color: 'orange'
  },
  followText: {
    color: 'orange'
  }
});

export default styles;
