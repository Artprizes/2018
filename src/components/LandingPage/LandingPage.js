import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Picker,
  ImageBackground,
  Dimensions,
  Linking,
  Image
} from "react-native";

/* USE THE FOLLOWING LINK TO FIX VECTOR ICONS METRO BUILDER ERROR...
https://github.com/oblador/react-native-vector-icons/issues/626#issuecomment-362386341 */
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./style";

import axios from "axios";
import Api from "../../utils/Api";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import FBSDK, {
  LoginButton,
  AccessToken,
  LoginManager
} from "react-native-fbsdk";
const windowWidth = Dimensions.get("window").width;
class LandingPage extends Component {
  static navigationOptions = { header: null };

  _onHandleLoginFbAuth = async () => {
    try {
      const logInResult = await LoginManager.logInWithReadPermissions([
        "public_profile"
      ]);

      if (logInResult.isCancelled) {
        alert("Login cancelled");
        return;
      }

      const userid = (await AccessToken.getCurrentAccessToken()).userID.toString();
      //alert("UserID" + userid);
      try {
        await axios.get(
          `https://api.art-prizes.com/api/login/register/${userid}/${userid}/${userid}/`
        );
      } catch (e) {
        console.log(e);
      }
      const response = await axios.get(
        `https://api.art-prizes.com/api/login/` + userid + `/` + userid
      );
      const logInToken = response.data.token;
      //alert("Api Token" + logInToken);
      await AsyncStorage.setItem("user", logInToken);
      Api.setToken(logInToken);
      this.props.navigation.navigate(logInToken ? "app" : "LandingPage");
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            width: 150,
            height: 60,
            alignSelf: "center"
          }}
          source={require("../../assets/ap_512by512.png")}
        />

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <LinearGradient
            colors={["#7B1FA2", "#4527A0"]}
            style={{
              borderRadius: 50,
              height: 50,
              margin: 10,
              width: 280
            }}
          >
            <Text style={styles.loginText}>Log In</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onHandleLoginFbAuth}>
          <LinearGradient
            colors={["#3B5998", "#3B5998"]}
            style={{
              borderRadius: 50,
              height: 50,
              margin: 10,
              width: 280
            }}
          >
            <Text style={styles.emailText}>Facebook Login</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              textDecorationLine: "underline",
              color: "black",
              textAlign: "center",
              fontFamily: "OpenSans-Bold",
              fontSize: 12,
              marginTop: 5
            }}
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            No Account Yet? Sign Up.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              textDecorationLine: "underline",
              color: "black",
              textAlign: "center",
              fontFamily: "OpenSans-SemiBold",
              fontSize: 12,
              margin: 10
            }}
            onPress={() =>
              Linking.openURL("http://www.art-prizes.com/PrivacyPolicy.html")
            }
          >
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(LandingPage);
