import React, { PureComponent } from "react";
import {
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  Linking,
  ActivityIndicator
} from "react-native";
import debounce from "lodash.debounce";
import { Text } from "native-base";

// /import { List, ListItem } from "react-native-elements";
//import Icon from "react-native-vector-icons/Ionicons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import distanceInWordsStrict from "date-fns/distance_in_words_strict";
import ExhibitionCard from "../../src/components/card/ExhibitionCard";
import Swiper from "react-native-swiper";
import DropDown from "../../src/components/DropDown";
import FilterList from "../../src/components/FilterList";

import {
  fetchExhibitions,
  fetchAllPrizes,
  showExhibitions,
  dataSortExhibitions,
  dataFilterExhibitions,
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
class Exhibitions extends PureComponent {
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
    this.props.fetchExhibitions();
    // This is for the bottom section of the page for Adverts
    this.props.fetchAdverts();
    //console.log(this.props.prizes);
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
    //this.props.showExhibitions(value);
  };

  handleSearch = () => {
    const { allPrizeList } = this.props.exhibitions;
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
        if (item2.sponsored  != item1.sponsored) {
           return item2.sponsored > item1.sponsored ? 1 : -1;
        }
        return new Date(item2.close_date).getTime() <=
          new Date(item1.close_date).getTime()
          ? 1
          : -1;
    }
  };

  handleFilterAdverts = item1 => {
    const { filterAdverts } = this.props.adverts;
    const todaysDate = Date.now();

    switch (filterAdverts) {
      default:
        return (todaysDate >= new Date( item1.ExhibitionBannerDateFrom ).valueOf() &&
          todaysDate <= new Date( item1.ExhibitionBannerDateTo ).valueOf())
    }
    if(todaysDate >= item1.ExhibitionBannerDateFrom &&
      todaysDate <= item1.ExhibitionBannerDateTo){
        liveAd = "ExhibitionBannerImage";
      }
      else if(todaysDate >= item1.fromDate &&
          todaysDate <= item1.toDate)
          {
           liveAd = "Image";
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

    if (filterType.length === 0) return true;

    // console.warn({ item })

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
        case "TAS": {
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
        style={{ width: 100, height: 100, alignSelf: "center" }}
        source={require("../assets/ap_512by512.png")}
      />
    ),
    headerTitleStyle: { textAlign: "center", alignSelf: "center" }
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
    const { loading, allprizeserror, allPrizeList } = this.props.exhibitions;
    const { searchResults, searchQuery, searching } = this.state;

    // console.log(data, "Data in feed component");
    return (
      <View>
        <View
          style={{
            backgroundColor: "#444"
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
                  height: 40,
                  borderRadius: 10,
                  marginVertical: 3,
                  marginHorizontal: 3,
                  padding: 10,
                  color: "#231F20",
                  fontFamily: "OpenSans-Regular",
                  fontSize: 14,
                  backgroundColor: "#fff"
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
            flexDirection: "row",
            marginTop: 0,
            maxHeight: 45,
            backgroundColor: "white"
          }}
        >
          <DropDown onPress={this.handleChangeSort} />

          <FilterList onPress={this.handleFilter} />
        </View>
        <ScrollView>
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
            {exhibitionList.filter(this.handleFilterByType).length} Prizes
            Exhibiting
          </Text>
          {searchQuery.length > 0 ? (
            searching ? (
              <Text>Searching...</Text>
            ) : searchResults.length === 0 ? (
              <Text>No results found</Text>
            ) : (
              searchResults.map(prize => (
                <ExhibitionCard
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
                    prize.ExhibitionEndDate,
                    new Date()
                  )}
                />
              ))
            )
          ) : exhibitionList != null &&
          exhibitionList instanceof Array &&
          exhibitionList.length > 0 ? (
            exhibitionList
              .filter(this.handleFilterByType)
              .sort(this.handleSort)
              .map((prize, index, array) => (
                <ExhibitionCard
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
      fetchAllPrizes,
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
)(Exhibitions);
