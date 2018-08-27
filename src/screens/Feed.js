import React, { PureComponent } from "react";
import {
  TextInput,
  View,
  ScrollView,
  Modal,
  Image,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Linking,
  List,
  Text,
  FlatList,
  ActivityIndicator
} from "react-native";
import debounce from "lodash.debounce";

import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { bindActionCreators } from "redux";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import authStorage from "../utils/authStorage";
import { format } from "date-fns";
import distanceInWordsStrict from "date-fns/distance_in_words_strict";
import Card from "../../src/components/card/";
import Swiper from "react-native-swiper";
import LinearGradient from "react-native-linear-gradient";
// SORT COMPONENT...
import DropDown from "../../src/components/DropDown";
import FilterList from "../../src/components/FilterList";
import {
  fetchPrizes,
  fetchPrizesSuccess,
  fetchPrizesError,
  showPrizes,
  dataSort,
  dataFilter,
  fetchAdverts,
  fetcAdvertsSuccess,
  fetcAdvertsError
} from "../actions/actions";
import AlertErrorOutline from "material-ui/SvgIcon";
import { FETCH_PRIZE_BY_ID_SUCCESS } from "../constants/constants";

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

class Feed extends PureComponent {
  constructor() {
    super();
    this.state = {
      selected: undefined,
      modalVisible: false,
      textValue: "FILTER",
      searchResults: [],
      searchQuery: "",
      searching: false,
      onlyShowPastPrizes: false
    };

    this.handleSearch = debounce(this.handleSearch, 700);
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    this.props.fetchPrizes();
    // This is for the bottom section of the page for Adverts
    this.props.fetchAdverts();
    //console.log(this.props.prizes);
    //this.props.fetchAllPrizes();
  }

  // SEARCH BY ART PRIZES TITLE
  handleChangeSearch = value => {
    this.setState(
      {
        searchQuery: value.replace("/", ""),
        searching: true
      },
      this.handleSearch
    );
  };

  handleSearch = () => {
    const { allPrizeList } = this.props.prizes;

    const results = [];

    if (!this.state.searchQuery) {
      this.setState({
        searchResults: [],
        searching: false
      });
      return;
    }

    for (let i = 0; i < allPrizeList.length; i++) {
      if (
        new RegExp(this.state.searchQuery.toLowerCase()).test(
          allPrizeList[i].title.toLowerCase()
        )
      ) {
        results.push(allPrizeList[i]);
      }
    }

    this.setState({
      searchResults: results
        .filter(this.handleFilterByType)
        .sort(this.handleSort),
      searching: false
    });
  };

  handlePastPrizes = () => {
    const { allPrizeList, prizeList } = this.props.prizes;

    this.setState({
      onlyShowPastPrizes: !this.state.onlyShowPastPrizes
    });
  };

  // SORT BY DAYS CALLING SOON..
  handleChangeSort = value => {
    this.props.dataSort(value);
  };

  handleSort = (item1, item2) => {
    const { filterSort } = this.props.prizes;
    switch (filterSort) {
      case "Calling Soon": {
        // SHOW DAYS IN NUMERICAL ASCENDING ORDER
        return new Date(item2.close_date).getTime() <=
          new Date(item1.close_date).getTime()
          ? 1
          : -1;
      }
      case "Prize High-Low": {
        // SHOW PRIZE AMOUNT IN DESCNDING ORDER
        return item2.PrizeAmount > item1.PrizeAmount ? 1 : -1;
      }
      case "Most Views": {
        // SHOW VIEW COUNTS IN DESCENDING ORDER
        return item2.ViewCount > item1.ViewCount ? 1 : -1;
      }
      case "Most Follows": {
        // SHOW FOLLOW COUNTS IN DESCENDING ORDER
        return item2.FollowCount > item1.FollowCount ? 1 : -1;
      }
      case "Prize Genre": {
        // SHOW PRIZE TYPES IN ALPHABETICAL ASCENDING ORDER
        return item1.prize_type.localeCompare(item2.prize_type);
      }
      default:
        return item2.sponsored > item1.sponsored ? 1 : -1;
    }
  };

  handleFilterAdverts = item1 => {
    const { filterAdverts } = this.props.adverts;
    const currentDate = new Date().getTime();
    const prizeCloseDate = new Date(item1.toDate).getTime();
    console.log({ currentDate, prizeCloseDate }, currentDate < prizeCloseDate);

    return currentDate < prizeCloseDate;
  };
  // FILTER FUNCTIONS...
  handleFilter = value => {
    this.setState({
      textValue: value
    });
    this.props.dataFilter(value);
  };

  handleFilterByType = item => {
    const { filterType } = this.props.prizes;
    const { onlyShowPastPrizes } = this.state;

    const currentDate = Date.now();
    const prizeCloseDate = new Date(item.close_date).getTime();

    if (onlyShowPastPrizes) {
      return currentDate > prizeCloseDate;
    }

    if (filterType.length === 0) return true;

    return filterType.some(filter => {
      switch (filter) {
        case "Drawing":
        case "General":
        case "Sculpture":
        case "Photography":
        case "2D Works": {
          return filter === item.prize_type;
        }
        case "Australia":
        case "United Kingdom":
        case "United States":
        case "Italy":
        case "New Zealand":
        case "Germany":
        case "Ireland": {
          return filter === item.country;
        }
        case "NSW":
        case "VIC":
        case "SA":
        case "ACT":
        case "WA":
        case "NT":
        case "TAS":
        case "QLD": {
          return filter === item.state;
        }
        default:
          return false;
      }
    });
  };

  static navigationOptions = {
    headerTitle: (
      <Image
        style={{ width: 100, height: 100 }}
        source={require("../assets/ap_512by512.png")}
      />
    ),
    headerTitleStyle: { alignSelf: "center" }
  };
  render() {
    const { fetchingAds, adverterror, advertData } = this.props.adverts;
    const {
      fetching,
      error,
      prizeList,
      filterSearch,
      filterSort,
      loading,
      allprizeserror,
      allPrizeList
    } = this.props.prizes;
    const {
      searchResults,
      onlyShowPastPrizes,
      searchQuery,
      searching
    } = this.state;

    const prizesToDisplay = onlyShowPastPrizes ? allPrizeList : prizeList;

    const prizesDisplayFilter =
      searchQuery.length === 0 && prizeList != null && Array.isArray(prizeList)
        ? prizesToDisplay.filter(this.handleFilterByType).sort(this.handleSort)
        : [];

    return (
      /* this.props.searchBar toggles search bar on click */
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            backgroundColor: "#fcfcfc"
          }}
        >
          {this.props.searchBar && (
            <LinearGradient
              colors={["#7B1FA2", "#4527A0"]}
              style={{
                margin: 0,
                flexDirection: "row"
              }}
            >
              <TextInput
                style={{
                  height: 35,
                  alignItems: "stretch",
                  flexGrow: 1,
                  borderRadius: 10,
                  marginVertical: 3,
                  marginHorizontal: 3,
                  padding: 10,
                  color: "#767676",
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  marginLeft: 25,
                  backgroundColor: "#FFFFFF"
                }}
                placeholder="Search ..."
                placeholderTextColor="#767676"
                onChangeText={this.handleChangeSearch}
                value={searchQuery}
              />
              <CheckBox
                checked={this.state.onlyShowPastPrizes}
                title="Include Past Prizes "
                containerStyle={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  marginRight: 20,
                  padding: 0
                }}
                textStyle={{
                  color: "white"
                }}
                onPress={this.handlePastPrizes}
              />
            </LinearGradient>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 0,
            maxHeight: 40,
            backgroundColor: "white"
          }}
        >
          <DropDown onPress={this.handleChangeSort} />
          <FilterList onPress={this.handleFilter} />
        </View>

        <ScrollView>
          {searchQuery.length > 0 ? (
            searching ? (
              <Text>Searching...</Text>
            ) : searchResults.length === 0 ? (
              <Text>No results found</Text>
            ) : (
              searchResults.map(prize => (
                <Card
                  id={prize.id}
                  key={prize.id}
                  title={prize.title}
                  prizeAmount={parseInt(prize.PrizeAmount).toLocaleString("en")}
                  country={prize.country}
                  state={prize.state}
                  navigationFn={this.props.navigation.navigate}
                  prizeLogo={prize.prize_logo}
                  sponsored={prize.sponsored}
                  prizeType={prize.prize_type}
                  eligibility={prize.eligibility}
                  currencyType={prize.Currency}
                  navigate={prize.id}
                  viewCount={prize.ViewCount}
                  followCount={prize.FollowCount}
                  intentionToEnterCount={prize.IntentToEnterCount}
                  daysCount={distanceInWordsStrict(
                    prize.close_date,
                    new Date()
                  )}
                />
              ))
            )
          ) : prizesDisplayFilter.length > 0 ? (
            prizesDisplayFilter.map(prize => (
              <Card
                id={prize.id}
                key={prize.id}
                title={prize.title}
                prizeAmount={parseInt(prize.PrizeAmount).toLocaleString("en")}
                country={prize.country}
                state={prize.state}
                navigationFn={this.props.navigation.navigate}
                prizeLogo={prize.prize_logo}
                sponsored={prize.sponsored}
                prizeType={prize.prize_type}
                eligibility={prize.eligibility}
                currencyType={prize.Currency}
                navigate={prize.id}
                viewCount={prize.ViewCount}
                followCount={prize.FollowCount}
                intentionToEnterCount={prize.IntentToEnterCount}
                daysCount={distanceInWordsStrict(prize.close_date, new Date())}
              />
            ))
          ) : fetching ? (
            <ActivityIndicator
              color="#9C68E8"
              size="large"
              animating
              style={{ marginTop: 100 }}
            />
          ) : error ? (
            <Text>An error has occurred!</Text>
          ) : (
            <Text>No Calling Art Prizes to show.</Text>
          )}

          <Swiper
            autoplay
            showsButtons={false}
            showsPagination={false}
            horizontal={true}
          >
            {advertData.filter(this.handleFilterAdverts).map((item, i) => (
              <TouchableHighlight
                onPress={() =>
                  Linking.openURL(`https://art-prizes.com/${item.Image}`)
                }
                key={i}
              >
                <Image
                  source={{
                    uri: `https://art-prizes.com/${item.Image}`
                  }}
                  style={{
                    resizeMode: "contain",
                    height: 400
                  }}
                  key={i}
                />
              </TouchableHighlight>
            ))}
          </Swiper>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    prizes: state.prizes,
    allPrizes: state.allPrizes,
    adverts: state.adverts,
    searchBar: state.searchBar
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchPrizes,

      showPrizes,
      dataSort,
      dataFilter,
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
)(Feed);
