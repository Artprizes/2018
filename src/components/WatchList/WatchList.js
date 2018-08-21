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
  ActivityIndicator
} from "react-native";
import debounce from "lodash.debounce";
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

import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import authStorage from "../utils/authStorage";
import { format } from "date-fns";
import distanceInWordsStrict from "date-fns/distance_in_words_strict";
import WatchListCard from "../../../src/components/card/WatchListCard";
import ExhibitionCard from "../../../src/components/card/ExhibitionCard";
import Swiper from "react-native-swiper";
import LinearGradient from "react-native-linear-gradient";

import {
  fetchPrizes,
  fetchPrizesSuccess,
  fetchPrizesError,
  fetchAllPrizes,
  fetchAllPrizesSuccess,
  fetchAllPrizesError,
  fetchExhibitions,
  fetchExhibitionsSuccess,
  fetchExhibitionsError,
  showPrizes,
  dataSort,
  dataFilter,
  fetchAdverts,
  fetcAdvertsSuccess,
  fetcAdvertsError
} from "../../actions/actions";

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
class WatchList extends PureComponent {
  constructor() {
    super();
    this.state = {
      selected: undefined,
      modalVisible: false,
      textValue: "FILTER",
      searchResults: [],
      searchQuery: "",
      searching: false
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
    this.props.fetchExhibitions();
    // This is for the bottom section of the page for Adverts
    // this.props.fetchAdverts();
    this.props.fetchAllPrizes();
    //console.log(this.props.prizes);
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
  handleFilterSearchText = data => {
    const { filterSearch } = this.props.prizes;
    console.log(filterSearch, data);
    if (!filterSearch) return true;
    return data.title.toLowerCase().includes(filterSearch.toLowerCase());
  };

  // SORT BY DAYS CALLING SOON..
  handleChangeSort = value => {
    this.props.dataSort(value);
  };

  handleSort = (item1, item2) => {
    const { filterSort } = this.props.prizes;
    switch (filterSort) {
      case "Calling Soon": {
        console.log(item1.close_date);
        console.log(item2.close_date);
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
    switch (filterAdverts) {
      default:
        return new Date() > item1.toDate ? 1 : -1;
    }
  };
  // FILTER FUNCTIONS...
  handleFilter = value => {
    this.setState({
      textValue: value
    });
    this.props.dataFilter(value);
  };

  handleFilterWatched = prize => {
    return prize.watched;
  };

  handleFilterByType = item => {
    const { filterType } = this.props.prizes;

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
        source={require("../../assets/ap_512by512.png")}
      />
    ),
    headerTitleStyle: { textAlign: "center", alignSelf: "center" }
  };
  //static navigationOptions = { header: null };
  render() {
    const { prizes, exhibitions } = this.props;
    const {
      fetching,
      error,
      prizeList,
      filterSearch,
      filterSort
    } = this.props.prizes;
    const { fetching1, error1, exhibitionList } = this.props.exhibitions;
    const { loading, allprizeserror, allPrizeList } = this.props.prizes;
    const { searchResults, searchQuery, searching } = this.state;
    // console.log(data, "Data in feed component");
    return (
      /* this.props.searchBar toggles search bar on click */
      <View>
        <View
          style={{
            backgroundColor: "#fcfcfc"
          }}
        >
          {this.props.searchBar && (
            <LinearGradient
              colors={["#7B1FA2", "#4527A0"]}
              style={{
                margin: 0
              }}
            >
              <TextInput
                style={{
                  height: 35,
                  borderRadius: 10,
                  marginVertical: 3,
                  marginHorizontal: 3,
                  padding: 10,
                  color: "#767676",
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  backgroundColor: "#FFFFFF"
                }}
                placeholder="Search ...."
                onChangeText={this.handleChangeSearch}
                value={searchQuery}
              />
            </LinearGradient>
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 0,
            maxHeight: 5,
            backgroundColor: "white"
          }}
        />

        <ScrollView>
          {searchQuery.length > 0 ? (
            searching ? (
              <Text>Searching...</Text>
            ) : searchResults.length === 0 ? (
              <Text>No results found</Text>
            ) : (
              searchResults.map(prize => (
                <WatchListCard
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
          ) : (prizeList && prizeList.length > 0) ||
          (exhibitionList && exhibitionList.length > 0) ? (
            <View>
              {prizeList
                .filter(this.handleFilterSearchText)
                .filter(this.handleFilterByType)
                .filter(this.handleFilterWatched)
                .sort(this.handleSort)
                .map(prize => (
                  <WatchListCard
                    id={prize.id}
                    key={prize.id}
                    title={prize.title}
                    prizeAmount={parseInt(prize.PrizeAmount).toLocaleString(
                      "en"
                    )}
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
                ))}
              {exhibitionList && exhibitionList.length > 0
                ? exhibitionList
                    .filter(this.handleFilterSearchText)
                    .filter(this.handleFilterByType)
                    .filter(this.handleFilterWatched)
                    .sort(this.handleSort)
                    .map(prize => (
                      <WatchListCard
                        id={prize.id}
                        key={prize.id}
                        title={prize.title}
                        prizeAmount={parseInt(prize.PrizeAmount).toLocaleString(
                          "en"
                        )}
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
                : null}
            </View>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    prizes: state.prizes,
    exhibitions: state.exhibitions,
    adverts: state.adverts,
    searchBar: state.searchBar
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchPrizes,
      fetchAllPrizes,
      showPrizes,
      dataSort,
      fetchExhibitions,
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
)(WatchList);
