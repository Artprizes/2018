import React, { PureComponent } from "react";
import {
  TextInput,
  View,
  FlatList,
  Modal,
  Image,
  AsyncStorage,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Linking,
  List,
  Text,
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
  fetchAllPrizes,
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
      onlyShowPastPrizes: false,
      status: ""
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
    this.props.fetchAllPrizes();
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

    if (!this.state.searchQuery) {
      this.setState({
        searchResults: [],
        searching: false
      });
      return;
    }

    const testPattern = new RegExp(this.state.searchQuery.toLowerCase());
    const searchResults = allPrizeList
      .filter(prize => testPattern.test(prize.title.toLowerCase()))
      .filter(this.handleFilterByType)
      .sort(this.handleSort);

    this.setState({
      searchResults,
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
        if (item2.sponsored  != item1.sponsored) {
           return item2.sponsored > item1.sponsored ? 1 : -1;
        }  
        return new Date(item2.close_date).getTime() <=
          new Date(item1.close_date).getTime()
          ? 1
          : -1;
     }
  };

  handleFilterAdverts = item => {
    const { filterAdverts } = this.props.adverts;
    const currentDate = new Date().getTime();
    const prizeCloseDate = new Date(item.ExhibitionBannerDateTo).getTime();
    const todaysDate = Date.now();

    switch (filterAdverts) {
      default:
return (todaysDate >= new Date( item.ExhibitionBannerDateFrom ).valueOf() &&
         todaysDate <= new Date( item.ExhibitionBannerDateTo ).valueOf()) || (todaysDate >= new Date( item.fromDate ).valueOf() &&
         todaysDate <= new Date( item.toDate ).valueOf())
    }
   
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

    //  return !!item.id;

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

  flatListItems = () => {
    const { prizeList, allPrizeList } = this.props.prizes;

    const {
      searchResults,
      searchQuery,
      searching,
      onlyShowPastPrizes
    } = this.state;

    const prizesToDisplay = onlyShowPastPrizes ? allPrizeList : prizeList;

    const prizesDisplayFilter =
      searchQuery.length === 0 && Array.isArray(prizeList)
        ? prizesToDisplay.filter(this.handleFilterByType).sort(this.handleSort)
        : [];

    if (searchResults.length) {
      return [...searchResults, this.renderFlatListFooter()];
    }

    if (prizesDisplayFilter.length) {
      return [...prizesDisplayFilter, this.renderFlatListFooter()];
    }

    return [];
  };

  renderFlatListFooter = () => {
    const { advertData } = this.props.adverts;
    return {
      advert: true,
      component: (
        <Swiper
          autoplay
          showsButtons={false}
          showsPagination={false}
          horizontal={true}
          key="footer"
        >
                     {advertData.filter(this.handleFilterAdverts).map((item, i) => {
              const liveAd = (
                Date.now() >= new Date( item.ExhibitionBannerDateFrom ).valueOf() &&
                Date.now() <= new Date( item.ExhibitionBannerDateTo ).valueOf()
              )
                ? item.ExhibitionBannerImage
                : (
                  item.toDate && item.fromDate &&
                  Date.now() >= new Date( item.fromDate ).valueOf() &&
                  Date.now() <= new Date( item.toDate ).valueOf()
                )
                  ? item.Image
                  : null;

                  console.warn({ liveAd, item })

              return (
                <TouchableHighlight
                  onPress={() => Linking.openURL(item.url)}
                  key={i}
                >
                  <Image
                    source={{
                      uri: `https://art-prizes.com/${liveAd}`
                    }}
                    style={{
                      resizeMode: "contain",
                      height: 400
                    }}
                    key={i}
                  />
                </TouchableHighlight>
              );
            })}
        </Swiper>
      )
    };
  };

  static navigationOptions = {
    headerTitle: (
      <Image
        style={{ width: 100, height: 100, alignSelf: "center" }}
        source={require("../assets/ap_512by512.png")}
      />
    ),
    headerTitleStyle: { alignSelf: "center" }
  };

  renderList() {
    return (
      <FlatList
        data={this.flatListItems()}
        renderItem={({ item }) => {
          if (item.advert) {
            return item.component;
          }
          return (
            <Card
              id={item.id}
              key={item.id}
              title={item.title}
              prizeAmount={parseInt(item.PrizeAmount).toLocaleString("en")}
              country={item.country}
              state={item.state}
              navigationFn={this.props.navigation.navigate}
              prizeLogo={item.prize_logo}
              sponsored={item.sponsored}
              prizeType={item.prize_type}
              eligibility={item.eligibility}
              currencyType={item.Currency}
              navigate={item.id}
              viewCount={item.ViewCount}
              followCount={item.FollowCount}
              intentionToEnterCount={item.IntentToEnterCount}
              daysCount={distanceInWordsStrict(item.close_date, new Date())}
            />
          );
        }}
      />
    );
  }

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
                  height: 40,
                  alignItems: "stretch",
                  flexGrow: 1,
                  borderRadius: 10,
                  marginVertical: 3,
                  marginHorizontal: 3,
                  padding: 10,
                  color: "#231F20",
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  backgroundColor: "#FFFFFF"
                }}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Search ..."
                placeholderTextColor="#767676"
                onChangeText={this.handleChangeSearch}
                value={searchQuery}
                clearButtonMode="always"
              />
              {/* <CheckBox
                checked={this.state.onlyShowPastPrizes}
                title="All Prizes "
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
              /> */}
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
        <Text
          style={{
            color: "#1F1F1F",
            fontFamily: "Open Sans",
            fontWeight: "500",
            fontSize: 15,
            marginTop: 20,
            textAlign: "center",
            lineHeight: 20
          }}
        >
          {prizeList.filter(this.handleFilterByType).length} Prizes Calling
        </Text>
        {searchQuery.length > 0 ? (
          searching ? (
            <Text>Searching...</Text>
          ) : fetching ? (
            <ActivityIndicator
              color="#9C68E8"
              size="large"
              animating
              style={{ marginTop: 100 }}
            />
          ) : searchResults.length > 0 ? (
            this.renderList()
          ) : (
            <Text>No results found</Text>
          )
        ) : (
          this.renderList()
        )}
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
      fetchAllPrizes,
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
