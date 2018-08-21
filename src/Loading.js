import React, { PureComponent } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Storage from "../Storage";
import Api from "./utils/Api";

class Loading extends PureComponent {
  componentDidMount() {
    this.checkIfAuthenticated();
  }

  checkIfAuthenticated = async () => {
    const { navigation } = this.props;
    const token = await Storage.get("user");

    console.log(token);

    if (token) {
      Api.setToken(token);
      navigation.navigate("app");
    } else navigation.navigate("auth");
  };

  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          height: "100%"
        }}
      >
        <ActivityIndicator />
        <Text>Loading..</Text>
      </View>
    );
  }
}

export default Loading;
