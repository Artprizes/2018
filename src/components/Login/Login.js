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
  ScrollView,
  Image
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./style";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { CheckBox } from "react-native-elements";
import { Button } from "react-native-elements";
import axios from "axios";
import Api from "../../utils/Api";
import { bindActionCreators } from "redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import FBSDK, {
  LoginButton,
  AccessToken,
  LoginManager
} from "react-native-fbsdk";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: "",
      checked: false
    };
  }

  _onHandleLogin = () => {
    const { username, password, error, checked } = this.state;
    axios
      .get(`https://api.art-prizes.com/api/login/` + username + `/` + password)
      .then(async response => {
        const token = response.data.token;
        console.log(response);
        // alert(checked);
        if (checked) {
          await AsyncStorage.setItem("user", token);
        }
        Api.setToken(token);

        this.props.navigation.navigate(token ? "app" : "Login");
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: "Invalid Username or Password" });
      });
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
          <FontAwesome name="user" size={19} style={styles.icons} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#95989A"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcon name="lock" size={19} style={styles.icons} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#95989A"
            secureTextEntry={true}
            maxLength={15}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <Text style={styles.errorMsg}>{this.state.error}</Text>
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
            <Text style={styles.loginText}> Log In </Text>
          </LinearGradient>
        </TouchableOpacity>
        <CheckBox
          checked={this.state.checked}
          title="Remember Me"
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            padding: 0
          }}
          textStyle={{
            color: "#1F1F1F"
          }}
          onPress={() => this.setState({ checked: !this.state.checked })}
        />

        <TouchableOpacity>
          <Text
            style={{
              textDecorationLine: "underline",
              color: "#1F1F1F",
              textAlign: "center",
              fontFamily: "OpenSans-SemiBold",
              fontSize: 12,
              marginTop: 5
            }}
            onPress={() => this.props.navigation.navigate("ResetPassword")}
          >
            Forgot Password ?
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Login);
