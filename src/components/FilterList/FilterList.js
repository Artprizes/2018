/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { dataFilter, clearFilter } from "../../actions/actions";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
const prizeType = [
  {
    title: "Drawing",
    value: "Drawing"
  },
  {
    title: "General",
    value: "General"
  },
  {
    title: "Sculpture",
    value: "Sculpture"
  },
  {
    title: "Photography",
    value: "Photography"
  },
  {
    title: "2D Works",
    value: "2D Works"
  }
];
const location = [
  {
    country: "Australia",
    value: "Australia",
    isScreen: true
  },
  {
    country: "International",
    value: "International",
    isScreen: true
  }
];

const countries = [
  {
    country: "United Kingdom",
    value: "United Kingdom"
  },
  {
    country: "United States",
    value: "United States"
  },
  {
    country: "Italy",
    value: "Italy"
  },
  {
    country: "New Zealand",
    value: "New Zealand"
  },
  {
    country: "Germany",
    value: "Germany"
  },
  {
    country: "Ireland",
    value: "Ireland"
  }
];
const states = [
  {
    title: "NSW",
    value: "NSW"
  },
  {
    title: "VIC",
    value: "VIC"
  },
  {
    title: "SA",
    value: "SA"
  },
  {
    title: "ACT",
    value: "ACT"
  },
  {
    title: "WA",
    value: "WA"
  },
  {
    title: "NT",
    value: "NT"
  },
  {
    title: "TAS",
    value: "TAS"
  },
  {
    title: "QLD",
    value: "QLD"
  }
];
const pickerValues = [
  {
    title: "Prize Type",
    value: "prizetype"
  },
  {
    title: "Location",
    value: "location"
  }
];

export class FilterList extends PureComponent {
  constructor() {
    super();

    this.state = {
      pickerSelection: "Filter",
      pickerDisplay: false,
      screen: "main",
      selectedItems: []
    };
  }

  handlePress = ({ value, isScreen }) => () => {
    if (isScreen) this.handleChangeScreen(value);
    else this.handleFilter({ value });
  };

  handleChangeScreen = screen => {
    this.setState({ screen });
  };

  handleFilter = ({ value }) => {
    // this.setState({
    //   pickerSelection: value || 'FILTER',
    // });
    //this.togglePicker();
    this.props.dataFilter(value);
  };

  handleClearFilter = () => {
    this.props.clearFilter();
    this.togglePicker();
  };

  togglePicker = () => {
    this.setState({
      pickerDisplay: !this.state.pickerDisplay,
      screen: "main"
    });
  };
  render() {
    const { screen } = this.state;
    const { filterType } = this.props.prizes;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.togglePicker()}
          title="FILTER"
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
                fontWeight: "600",
                fontFamily: "OpenSans-Regular",
                fontSize: 14
              }}
            >
              {this.state.pickerSelection}
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
          transparent={true}
          supportedOrientations={["portrait", "landscape"]}
          animationType="fade"
          onRequestClose={() => console.log("closed")}
        >
          {/* <ScrollView> */}
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
              marginLeft: 0,
              width: 190,
              backgroundColor: "white",
              shadowColor: "#BEBEBE",
              shadowOffset: { width: 5, height: 5 },
              shadowRadius: 25,
              shadowOpacity: 5.0,
              top: 165,
              //left: 380,
              justifyContent: "flex-end",
              right: 0,
              position: "absolute",
              zIndex: 10
            }}
          >
            {screen === "main" ? (
              <View>
                {pickerValues.map((value, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => this.handleChangeScreen(value.value)}
                      style={{
                        padding: 12,
                        borderWidth: 0.5,
                        borderColor: "#BEBEBE",
                        flexDirection: "row",
                        justifyContent: "space-around"
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "OpenSans-Regular",
                          fontSize: 13
                        }}
                      >
                        {value.title}
                      </Text>
                      <Ionicons
                        name="md-arrow-dropdown"
                        size={18}
                        color="black"
                      />
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
                    Clear
                  </Text>
                </TouchableOpacity>
              </View>
            ) : screen === "location" ? (
              <View>
                <TouchableOpacity
                  onPress={() => this.handleChangeScreen("main")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center"
                    }}
                  >
                    <Feather
                      name="arrow-left"
                      size={18}
                      style={{ marginTop: 10 }}
                    />
                    <Text style={{ margin: 10 }}>Location</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleClearFilter()}>
                  <Text
                    style={{
                      padding: 10,
                      textAlign: "center",
                      backgroundColor: "#EBEBEB",
                      color: "#262938"
                    }}
                  >
                    Clear
                  </Text>
                </TouchableOpacity>
                {location.map((loc, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={this.handlePress(loc)}
                    style={{
                      padding: 10,
                      borderBottomWidth: 0.5,
                      borderBottomColor: "#BEBEBE",
                      flexDirection: "row",
                      justifyContent: "space-around"
                    }}
                  >
                    <Text>{loc.country}</Text>
                    <Entypo name="chevron-right" size={18} />
                    {filterType.includes(loc.value) ? (
                      <MaterialIcons name="check" />
                    ) : null}
                  </TouchableOpacity>
                ))}
              </View>
            ) : screen === "prizetype" ? (
              <View>
                <TouchableOpacity
                  onPress={() => this.handleChangeScreen("main")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center"
                    }}
                  >
                    <Feather
                      name="arrow-left"
                      size={22}
                      style={{ marginTop: 20 }}
                    />
                    <Text
                      style={{
                        margin: 20
                      }}
                    >
                      Prize Type
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.handleClearFilter()}>
                  <Text
                    style={{
                      padding: 10,
                      textAlign: "center",
                      backgroundColor: "#EBEBEB",
                      color: "#262938"
                    }}
                  >
                    Clear
                  </Text>
                </TouchableOpacity>

                {prizeType.map((prize, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.handleFilter(prize)}
                    style={{
                      padding: 10,
                      borderBottomWidth: 0.5,
                      borderBottomColor: "#BEBEBE",
                      flexDirection: "row"
                    }}
                  >
                    <Text style={{ padding: 5 }}>{prize.title} </Text>
                    {filterType.includes(prize.value) ? (
                      <LinearGradient
                        colors={["#7B1FA2", "#4527A0"]}
                        style={{
                          position: "absolute",
                          top: 0,
                          width: 190,
                          height: 45,
                          padding: 0,
                          margin: 0
                        }}
                      >
                        <Text
                          style={{
                            marginTop: 15,
                            marginLeft: 15,
                            color: "white"
                          }}
                        >
                          {prize.title}{" "}
                        </Text>
                        <MaterialIcons
                          size={18}
                          name="check"
                          style={{
                            alignItems: "flex-end",
                            position: "absolute",
                            right: 20,
                            top: 10,
                            color: "white"
                          }}
                        />
                      </LinearGradient>
                    ) : null}
                  </TouchableOpacity>
                ))}
              </View>
            ) : screen === "Australia" ? (
              <View>
                <TouchableOpacity
                  onPress={() => this.handleChangeScreen("location")}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <Feather
                    name="arrow-left"
                    size={16}
                    style={{ marginTop: 10 }}
                  />
                  <Text style={{ margin: 10 }}>Australia</Text>
                </TouchableOpacity>

                {states.map((stat, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.handleFilter(stat)}
                    style={{
                      padding: 10,
                      borderBottomWidth: 0.5,
                      borderBottomColor: "#BEBEBE",
                      flexDirection: "row"
                    }}
                  >
                    <Text style={{ padding: 5 }}>{stat.title}</Text>
                    {filterType.includes(stat.value) ? (
                      <LinearGradient
                        colors={["#7B1FA2", "#4527A0"]}
                        style={{
                          position: "absolute",
                          top: 0,
                          width: 220,
                          height: 45,
                          padding: 0,
                          margin: 0
                        }}
                      >
                        <Text
                          style={{
                            marginTop: 15,
                            marginLeft: 15,
                            color: "white"
                          }}
                        >
                          {stat.title}{" "}
                        </Text>
                        <MaterialIcons
                          size={18}
                          name="check"
                          style={{
                            alignItems: "flex-end",
                            position: "absolute",
                            right: 20,
                            top: 10,
                            color: "white"
                          }}
                        />
                      </LinearGradient>
                    ) : null}
                  </TouchableOpacity>
                ))}
              </View>
            ) : screen === "International" ? (
              <View>
                <TouchableOpacity
                  onPress={() => this.handleChangeScreen("location")}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <Feather
                    name="arrow-left"
                    size={18}
                    style={{ marginTop: 10 }}
                  />
                  <Text style={{ margin: 10 }}>International</Text>
                </TouchableOpacity>

                {countries.map((country, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.handleFilter(country)}
                    style={{
                      padding: 10,
                      borderBottomWidth: 0.5,
                      borderBottomColor: "#BEBEBE",
                      flexDirection: "row"
                    }}
                  >
                    <Text style={{ padding: 5 }}>{country.value}</Text>
                    {filterType.includes(country.value) ? (
                      <LinearGradient
                        colors={["#7B1FA2", "#4527A0"]}
                        style={{
                          position: "absolute",
                          top: 0,
                          width: 220,
                          height: 45,
                          padding: 0,
                          margin: 0
                        }}
                      >
                        <Text
                          style={{
                            marginTop: 15,
                            marginLeft: 15,
                            color: "white"
                          }}
                        >
                          {country.value}
                        </Text>
                        <MaterialIcons
                          size={18}
                          name="check"
                          style={{
                            alignItems: "flex-end",
                            position: "absolute",
                            right: 20,
                            top: 10,
                            color: "white"
                          }}
                        />
                      </LinearGradient>
                    ) : null}
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>
          {/* </ScrollView> */}
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
      dataFilter,
      clearFilter
    },
    dispatch
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
export default connect(
  mapStateToProps,
  matchDispatchToProps
)(FilterList);
