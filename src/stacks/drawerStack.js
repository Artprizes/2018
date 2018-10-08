import { StackNavigator } from 'react-navigation';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { store } from '../store';
import DrawerScreen from './drawerScreen';
import Feed from '../screens/Feed';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { toggleSearchBar } from '../actions/search-bar';

const handleToggleSearchBar = () => {
  store.dispatch(toggleSearchBar());
};

const DrawerNavigation = StackNavigator(
  {
    DrawerStack: { screen: DrawerScreen },
    headerMode: 'none'
  },

  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        height: 60,
        elevation: 5
      },
      // title: 'Art Prizes',
      headerTintColor: 'black',

      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            if (navigation.state.index === 0) {
              navigation.navigate('DrawerOpen');
            } else {
              navigation.navigate('DrawerClose');
            }
          }}
        >
          <Text>
            <MaterialIcon name="menu" size={30} color="black" />
          </Text>
        </TouchableOpacity>
      ),
      headerRight: (
        <View
          style={{
            flex: 1,
            width: 100,
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}
        >
          <MaterialIcon
            name="home"
            size={30}
            color="black"
            onPress={() => {
              navigation.navigate('Feed');
            }}
          />

          <MaterialIcon
            name="search"
            size={30}
            color="black"
            onPress={handleToggleSearchBar}
            style={{}}
          />
        </View>
      )
    })
  }
);

export default DrawerNavigation;
