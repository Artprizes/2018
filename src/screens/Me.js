import React, { PureComponent } from "react";
import {
  TextInput,
  View,
  ScrollView,
  Modal,
  Image,
  AsyncStorage,
  TouchableHighlight,
  Dimensions
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Right,
  Body,
  Left,
  Picker,
  Form,
  List,
  ListItem,
  Text,
  Radio,
  CheckBox
} from "native-base";

// /import { List, ListItem } from "react-native-elements";
//import Icon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import authStorage from "../utils/authStorage";
import { format } from "date-fns";
import distanceInWordsStrict from "date-fns/distance_in_words_strict";
import ExhibitionCard from "../../src/components/card/";
import Swiper from "react-native-swiper";

import {
  fetchExhibitions,
  fetchExhibitionsSuccess,
  fetchExhibitionsError,
  showExhibitions,
  dataSortExhibitions,
  dataFilterExhibitions,
  fetchExhibitionId,
  fetchExhibitionIdSuccess,
  fetchExhibitionIdError,
  fetchAdverts,
  fetcAdvertsSuccess,
  fetcAdvertsError
} from "../actions/actions";

//import styles from "./FeedStyle";
const prizeArray = [
  "Drawing",
  "General",
  "Sculpture",
  "Photography",
  "2D Works"
];

const countryArray = [
  "Australia",
  "United Kingdom",
  "United States",
  "Italy",
  "New Zealand",
  "Germany",
  "Ireland"
];
const Slider = props => (
  <View style={styles.container}>
    <Image style={props.style} source={props.source} />
  </View>
);
class Me extends PureComponent {
  constructor() {
    super();
    this.state = {
      selected: undefined,
      modalVisible: false,
      textValue: "FILTER"
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentWillMount() {
    this.props.fetchExhibitions();
    // This is for the bottom section of the page for Adverts
    this.props.fetchAdverts();
    //console.log(this.props.prizes);
  }

  // SEARCH BY ART PRIZES TITLE
  handleChangeSearch = value => {
    this.props.showExhibitions(value);
  };
  handleFilterSearchText = data => {
    const { filterSearch } = this.props.exhibitions;
    console.log(filterSearch, data);
    if (!filterSearch) return true;
    return data.title.toLowerCase().includes(filterSearch.toLowerCase());
  };

  // SORT BY DAYS CALLING SOON..
  handleChangeSort = value => {
    this.props.dataSortExhibitions(value);
  };

  handleSort = (item1, item2) => {
    const { filterSort } = this.props.exhibitions;
    switch (filterSort) {
      case "daysSort": {
        console.log(item1.close_date);
        console.log(item2.close_date);
        // SHOW DAYS IN NUMERICAL ASCENDING ORDER
        return new Date(item2.close_date).getTime() <=
          new Date(item1.close_date).getTime()
          ? 1
          : -1;
      }
      case "Prizedescending": {
        // SHOW PRIZE AMOUNT IN DESCNDING ORDER
        return item2.PrizeAmount > item1.PrizeAmount ? 1 : -1;
      }
      case "viewsDesc": {
        // SHOW VIEW COUNTS IN DESCENDING ORDER
        return item2.ViewCount > item1.ViewCount ? 1 : -1;
      }
      case "followsDesc": {
        // SHOW FOLLOW COUNTS IN DESCENDING ORDER
        return item2.FollowCount > item1.FollowCount ? 1 : -1;
      }
      case "genreAsc": {
        // SHOW PRIZE TYPES IN ALPHABETICAL ASCENDING ORDER
        return item1.prize_type.localeCompare(item2.prize_type);
      }
      default:
        return item2.sponsored > item1.sponsored ? 1 : -1;
    }
  };

  // FILTER FUNCTIONS...
  handleFilter = value => {
    this.setState({
      textValue: value
    });
    this.props.dataFilterExhibitions(value);
  };
  handleFilterByType = item => {
    const { filterType } = this.props.exhibitions;

    //if (!filterType) return true;
    switch (filterType) {
      case "Drawing": {
        return item.prize_type === filterType;
      }
      case "General": {
        return item.prize_type === filterType;
      }
      case "Sculpture": {
        return item.prize_type === filterType;
      }
      case "Photography": {
        return item.prize_type === filterType;
      }
      case "2D Works": {
        return item.prize_type === filterType;
      }
      case "Australia": {
        return item.country === filterType;
      }
      case "United Kingdom": {
        return item.country === filterType;
      }
      case "United States": {
        return item.country === filterType;
      }
      case "Italy": {
        return item.country === filterType;
      }
      case "New Zealand": {
        return item.country === filterType;
      }
      case "Germany": {
        return item.country === filterType;
      }
      case "Ireland": {
        return item.country === filterType;
      }
      default:
        return true;
    }
  };

  static navigationOptions = () => {
    headerMode: "none";
    // let headerTitle = (
    //   <View>
    //     <TextInput placeholder="Search ...." />
    //   </View>
    // );
    // return { headerTitle, title: "Art Listing" };
  };
  render() {
    const {
      fetching,
      error,
      exhibitionList,
      filterSearch,
      filterSort
    } = this.props.exhibitions;
    const { fetchingAds, adverterror, advertData } = this.props.adverts;
    // console.log(data, "Data in feed component");
    return (
      <View>
        <View>
          {this.props.searchBar && (
            <TextInput
              style={{
                height: 35,
                borderWidth: 3,
                borderRadius: 8,
                borderColor: "#98A3AF",
                fontSize: 16
              }}
              placeholder="Search ...."
              onChangeText={this.handleChangeSearch}
              value={filterSearch}
            />
          )}
        </View>
        <View
          style={{
            width: "50%",
            backgroundColor: "#FFFFFF",
            shadowColor: "#BEBEBE",
            borderRadius: 10,
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 10,
            shadowOpacity: 1.0
          }}
        >
          <View style={{ width: "50%" }}>
            <Container>
              <Content>
                <Form>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    placeholder="SORT"
                    placeholderStyle={{ color: "black" }}
                    placeholderIconColor="black"
                    onValueChange={this.handleChangeSort.bind(this)}
                    selectedValue={filterSort}
                    itemStyle={{
                      backgroundColor: "transparent",
                      marginLeft: 0,
                      paddingLeft: 10
                    }}
                    itemTextStyle={{ color: "#788ad2" }}
                  >
                    <Picker.Item label="Calling Soon" value="daysSort" />
                    <Picker.Item
                      label="Prize High-Low"
                      value="Prizedescending"
                    />

                    <Picker.Item label="Most Views" value="viewsDesc" />
                    <Picker.Item label="Most Follows" value="followsDesc" />
                    <Picker.Item label="Prize Genre" value="genreAsc" />
                  </Picker>
                </Form>
              </Content>
            </Container>
          </View>
          <View style={{ width: "50%" }}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                alert("Modal has been closed.");
              }}
            >
              <View style={{ marginTop: 22 }}>
                <View>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Text>Close Filter</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <Container>
                <Header />
                <Content>
                  <ListItem itemDivider>
                    <Text>Prize Type</Text>
                  </ListItem>
                  <List
                    dataArray={prizeArray}
                    renderRow={item => (
                      <ListItem
                        onPress={() => {
                          this.handleFilter(item);
                          this.setModalVisible(false);
                        }}
                      >
                        <Text>{item}</Text>
                      </ListItem>
                    )}
                  />
                  <ListItem itemDivider>
                    <Text>County</Text>
                  </ListItem>
                  <List
                    dataArray={countryArray}
                    renderRow={item => (
                      <ListItem
                        onPress={() => {
                          this.handleFilter(item);
                          this.setModalVisible(false);
                        }}
                      >
                        <Text>{item}</Text>
                      </ListItem>
                    )}
                  />
                  <ListItem itemDivider>
                    <Text>Eligibility </Text>
                  </ListItem>
                </Content>
              </Container>
            </Modal>
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}
              style={{
                backgroundColor: "#FFFFFF",
                shadowColor: "#BEBEBE",
                borderRadius: 10,
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 10,
                shadowOpacity: 1.0
              }}
            >
              <Text style={{ padding: 14 }}>
                {this.state.textValue}
                {/* <Icon
                  name="ios-arrow-down-outline"
                  style={{ color: "white", padding: 30 }}
                /> */}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <ScrollView>
          <List>
            {exhibitionList && exhibitionList.length > 0 ? (
              exhibitionList
                .filter(this.handleFilterSearchText)
                .filter(this.handleFilterByType)
                .sort(this.handleSort)
                .map(prize => (
                  <ExhibitionCard
                    id={prize.id}
                    key={prize.id}
                    title={prize.title}
                    prizeAmount={prize.PrizeAmount}
                    country={prize.country}
                    state={prize.state}
                    navigationFn={this.props.navigation.navigate}
                    sponsored={prize.sponsored}
                    prizeType={prize.prize_type}
                    currencyType={prize.Currency}
                    navigate={prize.id}
                    viewCount={prize.ViewCount}
                    followCount={prize.FollowCount}
                    intentionToEnterCount={prize.IntentToEnterCount}
                    daysCount={distanceInWordsStrict(
                      prize.ExhibitionEndDate,
                      new Date()
                    )}
                  />
                ))
            ) : fetching ? (
              <Text>Loading...</Text>
            ) : error ? (
              <Text>An error has occurred!</Text>
            ) : (
              <Text>No Exhibition Art Prizes to show.</Text>
            )}
          </List>

          <Swiper autoplay height={400} width={400}>
            {advertData.slice(0, 20).map((item, i) => (
              <Slider
                source={{
                  uri: `https://art-prizes.com/${item.Image}`
                }}
                style={{ width: "100%", height: 280 }}
                key={i}
              />
            ))}
          </Swiper>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    exhibitions: state.exhibitions,
    adverts: state.adverts,
    searchBar: state.searchBar
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchExhibitions,
      showExhibitions,
      dataSortExhibitions,
      dataFilterExhibitions,
      fetchAdverts,
      fetcAdvertsSuccess,
      fetcAdvertsError
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Me);
