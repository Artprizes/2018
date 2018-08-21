import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Item,
  ImageBackground,
  AsyncStorage,
  Image,
  ScrollView
} from "react-native";
import styles from "./style";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CheckBox from "react-native-check-box";
import { Button } from "react-native-elements";
import axios from "axios";

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      usernameError: ""
    };
  }

  _onHandleLogin = () => {
    const { username, usernameError } = this.state;

    console.log(username);
    axios
      .get(`https://api.art-prizes.com/api/Login/ResetPassword/` + username)
      .then(response => {
        // const token = response.data.token;
        this.setState({ usernameError: response.data });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        this.setState({ usernameError: "Invalid Username" });
      });
  };
  onValueChange = (key, value) => {
    console.log(key + ":" + value);
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
        <View style={styles.inputContainer}>
          <FontAwesome
            name="user"
            size={19}
            color="white"
            style={styles.icons}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your Username"
            placeholderTextColor="#95989A"
            onChangeText={username => this.setState({ username })}
          />
        </View>
        <Text style={styles.errorMsg}>{this.state.usernameError}</Text>
        <TouchableOpacity onPress={this._onHandleLogin}>
          <LinearGradient
            colors={["#7B1FA2", "#4527A0"]}
            style={{
              borderRadius: 50,
              height: 50,
              margin: 10,
              width: 280
            }}
          >
            <Text style={styles.buttonText}> Reset Password </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text
            style={{
              color: "#1F1F1F",
              padding: 5,
              fontFamily: "OpenSans-SemiBold",
              fontSize: 12,
              textDecorationLine: "underline"
            }}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
