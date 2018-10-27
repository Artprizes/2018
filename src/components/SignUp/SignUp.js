import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import styles from "./style";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

import axios from "axios";
import FBSDK, {
  LoginButton,
  AccessToken,
  LoginManager
} from "react-native-fbsdk";
export default class Signp extends Component {
  constructor() {
    super();

    this.state = {
      // Store the data...
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMsg: "",
      emailValidate: false,
      userValidate: false,
      passwordValidate: false,
      confirmPasswordValidate: false
    };
  }
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

      await AsyncStorage.setItem("user", logInToken);
      Api.setToken(logInToken);
      this.props.navigation.navigate(logInToken ? "app" : "SignUp");
    } catch (e) {
      console.log(e);
    }
  };
  _onHandleSignup = async () => {
    const { username, email, password, confirmPassword, errorMsg } = this.state;

    if (
      this.state.userValidate &&
      this.state.emailValidate &&
      this.state.passwordValidate &&
      this.state.confirmPasswordValidate
    ) {
      axios
        .get(
          `https://api.art-prizes.com/api/login/register/` +
            username +
            `/` +
            password +
            `/` +
            email
        )
        .then(response => {
          const { status, token } = response.data;
          console.log(token + " " + status);
          this.setState({
            errorMsg: "Suceessfully registered, Please Log In"
          });
          // this.props.navigation.navigate("Login");
        })
        .catch(error => {
          console.log(error);
          this.setState({ errorMsg: "Username already registered" });
        });
    }
  };

  validate(text, type) {
    testEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    testUsername = /^([a-z0-9A-Z]){6,15}$/;
    if (type == "email") {
      this.setState({ emailValidate: testEmail.test(text) });
    }
    if (type == "username") {
      this.setState({ userValidate: testUsername.test(text) });
    }
    if (type == "password") {
      this.setState({ passwordValidate: text.length > 0 });
    }
    if (type == "confirmPassword") {
      this.setState({
        confirmPasswordValidate:
          this.state.password === this.state.confirmPassword
      });
    }
  }

  handleChangeText = field => value => {
    this.setState({ [field]: value }, () => {
      this.validate(value, field);
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image
          style={{
            width: 150,
            height: 60,
            alignSelf: "center"
          }}
          source={require("../../assets/ap_512by512.png")}
        />
        <View style={styles.inputContainer}>
          <MaterialIcon
            name="email"
            size={19}
            color="white"
            style={styles.icons}
          />
          <TextInput
            style={[
              styles.input,
              !this.state.emailValidate && this.state.email
                ? styles.error
                : null
            ]}
            placeholder="Email"
            placeholderTextColor="#95989A"
            onChangeText={this.handleChangeText("email")}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome
            name="user"
            size={19}
            color="white"
            style={styles.icons}
          />
          <TextInput
            style={[
              styles.input,
              !this.state.userValidate && this.state.username
                ? styles.error
                : null
            ]}
            placeholder="Username"
            placeholderTextColor="#95989A"
            onChangeText={this.handleChangeText("username")}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcon
            name="lock"
            size={19}
            color="white"
            style={styles.icons}
          />
          <TextInput
            style={[
              styles.input,
              !this.state.passwordValidate && this.state.password
                ? styles.error
                : null
            ]}
            placeholder="Password"
            placeholderTextColor="#95989A"
            secureTextEntry={true}
            onChangeText={this.handleChangeText("password")}
          />

          <Text style={styles.errorMsg}>{this.state.pwdError}</Text>
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcon
            name="lock"
            size={19}
            color="white"
            style={styles.icons}
          />
          <TextInput
            style={[
              styles.input,
              !this.state.confirmPasswordValidate && this.state.confirmPassword
                ? styles.error
                : null
            ]}
            placeholder="Confirm Password"
            placeholderTextColor="#95989A"
            secureTextEntry={true}
            onChangeText={this.handleChangeText("confirmPassword")}
          />
        </View>
        <View>
          <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
          <TouchableOpacity onPress={this._onHandleSignup}>
            <LinearGradient
              colors={["#7B1FA2", "#4527A0"]}
              style={{
                borderRadius: 50,
                height: 50,
                margin: 10,
                width: 280
              }}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                color: "#1F1F1F",
                padding: 5,
                textDecorationLine: "underline",
                textAlign: "center",
                fontFamily: "OpenSans-Regular",
                fontSize: 14
              }}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
