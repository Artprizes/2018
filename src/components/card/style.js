import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flex: 1
  },
  container: {
    padding: 5,
    margin: 10,
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: 'white',
    borderColor: '#FFFFFF',
    shadowColor: '#BEBEBE',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 9.0,
    flexDirection: 'row',

    justifyContent: 'space-around'
  },

  imageAvtar: {
    // height: 140,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 80,
    alignSelf: 'center'
  },

  descriptionContainer: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    marginLeft: 30
    // borderWidth: 0.5,
  },
  sponsoredText: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 40,
    color: '#EA6D6D',
    fontSize: 14,
    margin: 10
  },

  title: {
    color: '#1F1F1F',
    fontFamily: 'Open Sans',
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'left',
    lineHeight: 20
  },
  subtitle: {
    color: '#5D5D5F',
    fontFamily: 'Open Sans',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 25
  },
  numbers: {
    color: '#5D5D5F',
    marginLeft: 6,
    lineHeight: 20
  },

  icon: {
    color: '#5D5D5F'
  },

  values: {
    color: '#767676',
    marginLeft: 10,
    lineHeight: 20
  }
});

export default styles;
