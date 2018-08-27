import { TabNavigator, StackNavigator } from 'react-navigation';
import Feed from '../screens/Feed';
import { Image, StyleSheet } from 'react-native';
import Exhibitions from '../screens/Exhibitions';
import ArtDescription from '../../src/components/artdescription/';
import WatchList from '../components/WatchList';
import WatchListDescription from '../components/watchlistdescription';
import IntendedToEnter from '../components/IntendedToEnter';
import IntendedToEnterDescription from '../components/intendedtoenterdescription';
import ExhibitionDescription from '../../src/components/exhibitiondescription';

export const ArtsStack = StackNavigator(
  {
    Feed: {
      screen: Feed
    },
    ArtDescription: {
      screen: ArtDescription
    }
  },
  {
    headerMode: 'none'
  }
);

export const ExhibitionStack = StackNavigator(
  {
    Feed: {
      screen: Exhibitions
    },
    ExhibitionDescription: {
      screen: ExhibitionDescription
    }
  },
  {
    headerMode: 'none'
  }
);
export const WatchStack = StackNavigator(
  {
    WatchList: {
      screen: WatchList
    },
    WatchListDescription: {
      screen: WatchListDescription
    }
  },
  {
    headerMode: 'none'
  }
);

export const IntendedToEnterStack = StackNavigator(
  {
    IntendedToEnter: {
      screen: IntendedToEnter
    },
    IntendedToEnterDescription: {
      screen: IntendedToEnterDescription
    }
  },
  {
    headerMode: 'none'
  }
);
export const Tabs = TabNavigator(
  {
    Calling: {
      screen: ArtsStack
    },
    Exhibiting: {
      screen: ExhibitionStack
    }
  },
  // { mode: "modal" }, // this is needed to make sure header is hidden on ios
  {
    tabBarPosition: 'top',
    tabBarOptions: {
      style: {
        padding: 0,
        height: 30,
        width: 350,
        alignSelf: 'center',
        // alignItems: 'center',
        margin: 10,
        marginTop: 10

        // shadowColor: '#9C68E8',

        // shadowOffset: {
        //   width: 0,
        //   height: 0,
        // },
        // shadowRadius: 1,
        // shadowOpacity: 4.0
      },
      activeBackgroundColor: '#7B1FA2',
      activeTintColor: '#FFFFFF',
      labelStyle: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 14,
        textAlign: 'center',
        padding: 3
      }
    }
  }
);

export const Root = StackNavigator(
  {
    Tabs: {
      screen: Tabs
    }
  },

  {
    mode: 'modal',
    headerMode: 'none'
  }
);

export const Root2 = StackNavigator(
  {
    WatchList: { screen: WatchStack }
  },

  {
    mode: 'modal',
    headerMode: 'none',

    navigationOptions: {
      // initialRouteName: 'SecondScreen',
      headerMode: 'none',
      // headerTitle: 'Watch List',
      // headerTitle: <Image source={require('../assets/ap_512by512.png')} />,
      // headerTitle: <Image source={require('../assets/ap_512by512.png')} />,
      headerStyle: {
        height: 30
      }
      // drawerLabel: 'Second Screen',
    }
  }
);

export const Root3 = StackNavigator(
  {
    IntendedToEnter: { screen: IntendedToEnterStack }
  },

  {
    mode: 'modal',
    headerMode: 'none',

    navigationOptions: {
      // initialRouteName: 'SecondScreen',
      headerMode: 'none',
      // headerTitle: 'Watch List',
      // headerTitle: <Image source={require('../assets/ap_512by512.png')} />,
      // headerTitle: <Image source={require('../assets/ap_512by512.png')} />,
      headerStyle: {
        height: 30
      }
      // drawerLabel: 'Second Screen',
    }
  }
);
