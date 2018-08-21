import { DrawerNavigator, DrawerItems } from 'react-navigation';
import React from 'react';
import { Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImageGradient from 'react-native-image-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Content, Container, Header, Body, Footer } from 'native-base';
import Logout from '../components/LogOut';
import About from '../components/About';
import { Root, Root2, Root3, Root4 } from '../config/router';
import { View, Text } from 'react-native';

const DrawerScreen = DrawerNavigator(
  {
    // ArtList: {screen: ArtList},
    ArtList: {
      screen: Root,
      navigationOptions: {
        title: 'Art Prizes',
        drawerIcon: <MaterialIcon name="list" size={18} color="white" />
      }
    },
    WatchList: {
      screen: Root2,
      navigationOptions: {
        title: 'Watch List',
        drawerIcon: (
          <MaterialCommunityIcons name="set-none" size={18} color="white" />
        )
      }
    },
    IntendedToEnter: {
      screen: Root3,
      navigationOptions: {
        title: 'Intended to Enter',
        drawerIcon: (
          <FontAwesome
            name="user"
            type="font-awesome"
            size={18}
            color="white"
          />
        )
      }
    },
    About: {
      screen: About,
      navigationOptions: {
        title: 'About',
        drawerIcon: <FontAwesome name="gift" size={18} color="white" />
      }
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        title: 'Log Out',
        drawerIcon: <SimpleLineIcons name="logout" size={18} color="white" />
      }
    }
  },
  {
    headerMode: 'none',
    // drawerBackgroundColor: '#9C68E8',

    initialRouteName: 'ArtList',
    drawerPosition: 'left',
    drawerWidth: 300,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    contentComponent: props => (
      <LinearGradient colors={['#7B1FA2', '#4527A0']} style={{ flex: 1 }}>
        <Container>
          <Header
            style={{
              height: 200,
              width: 300,
              paddingTop: 0,
              paddingLeft: 0,
              paddingRight: 0
            }}
          >
            <Body>
              <Image
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: 'center'
                }}
                source={require('../assets/ap_512by512.png')}
              />
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: '#9C68E8',
                  width: '100%',
                  height: 200,
                  opacity: 0.4
                }}
              />
              <Text
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 20,
                  fontFamily: 'OpenSans-Bold',
                  fontSize: 24,
                  color: 'white'
                }}
              >
                ART PRIZES PLANNER
              </Text>
            </Body>
          </Header>
          <Content>
            <DrawerItems {...props} />
          </Content>
        </Container>
      </LinearGradient>
    ),
    contentOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#bdc3c7',
      labelStyle: {
        fontFamily: 'Open Sans',
        fontSize: 12,
        padding: 5
      }
    }
  }
);

export default DrawerScreen;
// const AppStack = StackNavigator({ Home: LandingPage, Root: Root });
// const AuthStack = StackNavigator({ Login: Login });
// export default SwitchNavigator(
//   {
//     AuthLoading: Login,
//     App: AppStack,
//     Auth: AuthStack,
//   },
//   {
//     initialRouteName: 'Login',
//   }
// );
