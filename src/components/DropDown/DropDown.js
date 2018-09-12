/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { clearSort } from "../../actions/actions";

class DropDown extends PureComponent {
  constructor() {
    super();

    this.state = {
      pickerSelection: "Sort",
      pickerDisplay: false
    };
  }
  handleChangeSort(newValue) {
    this.setState({
      pickerSelection: newValue
    });
    this.togglePicker();
    this.props.onPress(newValue);
  }
  handleClearFilter = () => {
    this.setState({
      pickerSelection: "Sort"
    });
    this.props.clearSort();
    this.togglePicker();
  };
  togglePicker = () => {
    this.setState({
      pickerDisplay: !this.state.pickerDisplay
    });
  };

  render() {
    const pickerValues = [
      {
        title: "Calling Soon",
        value: "Calling Soon"
      },
      {
        title: "Prize High-Low",
        value: "Prize High-Low"
      },
      {
        title: "Most Views",
        value: "Most Views"
      },
      {
        title: "Most Follows",
        value: "Most Follows"
      },
      {
        title: "Prize Genre",
        value: "Prize Genre"
      }
    ];
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.togglePicker()}
          title="Sort"
          style={{
            backgroundColor: "white",
            height: 40,
            marginTop: 15
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "#767676",
                textAlign: "center",
                fontWeight: "600",
                fontFamily: "OpenSans-Regular",
                fontSize: 14
              }}
            >
              Sort
            </Text>
            <Ionicons
              name="md-arrow-dropdown"
              size={18}
              color="black"
              style={{ marginLeft: 20 }}
            />
          </View>
        </TouchableOpacity>
        <Modal
          visible={this.state.pickerDisplay}
          style={{ alignItems: "center" }}
          transparent={true}
          animationType="fade"
          supportedOrientations={["portrait", "landscape"]}
          onRequestClose={() => console.log("closed")}
        >
          <TouchableOpacity
            onPress={this.togglePicker}
            style={{
              zIndex: 5,
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.05)"
            }}
          />
          <View
            style={{
              width: 190,
              backgroundColor: "white",
              shadowColor: "#BEBEBE",
              shadowOffset: { width: 5, height: 5 },
              shadowRadius: 25,
              shadowOpacity: 5.0,
              top: 165,
              left: 0,
              right: 220,
              position: "absolute",
              zIndex: 10
            }}
          >
            {pickerValues.map((value, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.handleChangeSort(value.value)}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 10
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "OpenSans-Regular",
                      fontSize: 13,
                      textAlign: "left"
                    }}
                  >
                    {value.title}
                  </Text>

                  {value.title === this.state.pickerSelection ? (
                    <Ionicons name="ios-radio-button-on-outline" size={18} />
                  ) : (
                    <Ionicons name="ios-radio-button-off-outline" size={18} />
                  )}
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity onPress={() => this.handleClearFilter()}>
              <Text
                style={{
                  padding: 10,
                  textAlign: "center",
                  borderWidth: 0.5,
                  // borderTopColor: "black",
                  backgroundColor: "#EBEBEB",
                  color: "#262938"
                }}
              >
                Home
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  prizes: state.prizes
});

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      clearSort
    },
    dispatch
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    overflow: "visible"
  }
});

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(DropDown);
