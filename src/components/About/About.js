import React, { PureComponent } from "react";
import { View, Text, Image, Linking } from "react-native";
import styles from "./style";
import call from "react-native-phone-call";

import { SocialIcon } from "react-native-elements";

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
        <View style={styles.iconsContainer}>
          <Text style={{ margin: 30 }}>Publisher</Text>
          <SocialIcon
            raised
            type="linkedin"
            onPress={() =>
              Linking.openURL("https://au.linkedin.com/in/martin-shub-1693661")
            }
          />
          <SocialIcon
            raised
            type="phone"
            iconColor="blue"
            onPress={() => call(args)}
          />
          <SocialIcon
            type="google-plus-official"
            raised
            onPress={() => Linking.openURL("mailto:martin@art-prizes.com")}
          />
        </View>
        <View style={styles.iconsContainer}>
          <Image
            source={require("../../assets/discoverymedia1.png")}
            style={{
              width: 400,
              height: 200,
              alignSelf: "center"
            }}
          />
        </View>
        <View style={styles.iconsContainer}>
          <Text
            style={{
              justifyContent: "center",
              fontFamily: "open sans",
              fontSize: 18
            }}
          >
            artprizes v 3.0.3
          </Text>
        </View>
      </View>
    );
  }
}
