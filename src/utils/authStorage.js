/* Simple wrapper around Async storage to save get and remove tokens */
import { AsyncStorage } from 'react-native';

class AuthStorage {
  static async save(key, value) {
    try {
      const token = await AsyncStorage.setItem(key, value);
      return token;
    } catch (error) {
      console.log(error, 'error in saving user token');
    }
  }

  static async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.log(error);
    }
  }

  static async remove(key) {
    try {
      const token = await AsyncStorage.removeItem(key);
      return token;
    } catch (error) {
      console.log(error, 'error in removing user token');
    }
  }
}

export default AuthStorage;
