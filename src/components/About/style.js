import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
