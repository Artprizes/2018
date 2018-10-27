import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  Linking,
  ScrollView,
  TouchableHighlight
} from "react-native";
import styles from "./style";
import call from "react-native-phone-call";

import { SocialIcon, Icon } from "react-native-elements";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";

const args = {
  number: "+61 412 477 556",
  prompt: true
};

export default class About extends PureComponent {
  static navigationOptions = {
    headerTitle: (
      <Image
        style={{ width: 100, height: 100 }}
        source={require("../../assets/ap_512by512.png")}
      />
    ),
    headerTitleStyle: { textAlign: "center", alignSelf: "center" }
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.header}>
            <Text
              style={{
                marginTop: 20,
                padding: 30,
                fontSize: 18
              }}
            >
              Publisher: Martin Shub
            </Text>
          </View>
          <View style={styles.socialIcons}>
            <SocialIcon
              type="facebook"
              onPress={() =>
                Linking.openURL("https://www.facebook.com/ArtPrizes/")
              }
            />
            <SocialIcon
              type="instagram"
              onPress={() =>
                Linking.openURL("https://www.instagram.com/artprizes/")
              }
            />
            <SocialIcon
              type="linkedin"
              onPress={() =>
                Linking.openURL(
                  "https://au.linkedin.com/in/martin-shub-1693661"
                )
              }
            />
            <SocialIcon
              type="twitter"
              onPress={() =>
                Linking.openURL("https://twitter.com/austArtprizes")
              }
            />
            <Entypo name="old-phone" size={24} onPress={() => call(args)} />
          </View>
          <View style={styles.iconsContainer}>
            <TouchableHighlight
              onPress={() => Linking.openURL("https://art-prizes.com/")}
            >
              <Image
                source={require("../../assets/discoverymedia1.png")}
                style={{
                  width: 600,
                  height: 300,
                  alignItems: "stretch"
                  // alignSelf: "center"
                }}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.iconsContainer}>
            <Text
              style={{
                justifyContent: "center",
                fontFamily: "open sans",
                fontSize: 18
              }}
            >
              artprizes v 3.0.31
            </Text>
            <Text style={{ marginTop: 20 }}>
              Copyright © Discovery Media 2018
            </Text>
            <Text style={{ marginTop: 20 }}>Developed By</Text>
            <TouchableHighlight
              onPress={() => Linking.openURL("http://gada.io//")}
            >
              <Image
                source={require("../../assets/GadaLogo.png")}
                style={{
                  width: 250,
                  height: 200,
                  alignItems: "stretch"
                  // alignSelf: "center"
                }}
              />
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }
}
