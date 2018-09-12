import React, { PureComponent } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking
} from "react-native";
import styles from "./style";
import Entypo from "react-native-vector-icons/Entypo";
import { ShareDialog } from "react-native-fbsdk";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { format } from "date-fns";
import HTML from "react-native-render-html";
import distanceInWordsStrict from "date-fns/distance_in_words_strict";
import {
  fetchExhibitionId,
  fetchExhibitionIdSuccess,
  fetchExhibitionIdError,
  fetchAdverts,
  fetcAdvertsSuccess,
  fetcAdvertsError,
  intentToEnterExhibitions,
  watchListExhibitions
} from "../../actions/actions";

class ExhibitionDescription extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enterCount: props.exhibitions.selectedExhibition.IntendedToEnter,
      watchCount: props.exhibitions.selectedExhibition.watched
    };
    const shareLinkContent = {
      contentType: "link",
      contentUrl: "https://www.facebook.com/",
      contentDescription: "Facebook sharing is easy!"
    };

    this.state = { shareLinkContent: shareLinkContent };
  }
  shareLinkWithShareDialog() {
    var tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent)
      .then(function(canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      })
      .then(
        function(result) {
          if (result.isCancelled) {
            alert("Share cancelled");
          } else {
            alert("Share success with postId: " + result.postId);
          }
        },
        function(error) {
          alert("Share fail with error: " + error);
        }
      );
  }
  static navigationOptions = {
    tabBarVisible: false,
    header: null
  };

  handleEnterPrizes = id => {
    this.setState({ enterCount: !this.state.enterCount }, () => {
      // In oeder tp  add Intent to enter we need id, usertoken and boolean value as true or false..
      // PUT request for API url   Observable.ajax.put.....
      //alert(id);
      const flag = this.state.enterCount;
      this.props.intentToEnterExhibitions(id, flag);
    });
  };

  handleWatchList = id => {
    this.setState({ watchCount: !this.state.watchCount }, () => {
      const flag = this.state.watchCount;
      //alert(id);
      this.props.watchListExhibitions(id, flag);
    });
  };

  componentDidMount() {
    // PASS ID AS AN ARGUMENT TO GET EXHIBITION DETAILS ON PARTICULAR ID...
    this.props.fetchAdverts(); //Retrun all ads with corresponding prize id..
    const { fetchingAds, adverterror, advertData } = this.props.adverts;
    this.props.fetchExhibitionId(this.props.navigation.state.params);
    const { id } = this.props.navigation.state.params;
    //alert(id);
    const advert = advertData.find(item => {
      return String(item.prizeid) === String(id);
    });
    if (advert != null) {
      // alert(advert.Image);
      this.setState({ advert });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.exhibitions.selectedExhibition.watched !==
        this.state.watchCount &&
      this.state.watchCount == null
    )
      this.setState({
        watchCount: nextProps.exhibitions.selectedExhibition.watched
      });

    if (
      nextProps.exhibitions.selectedExhibition.IntendedToEnter !==
        this.state.enterCount &&
      this.state.enterCount == null
    )
      this.setState({
        enterCount: nextProps.exhibitions.selectedExhibition.IntendedToEnter
      });

    const selectedExhibition = this.props.exhibitions.allPrizeList.filter(
      prize => prize.id == nextProps.exhibitions.selectedExhibition.id
    );

    const selectedExhibitionImage = selectedExhibition[0].prize_logo;
    this.setState({
      selectedExhibitionImage
    });
  }

  static navigationOptions = {
    headerTitle: (
      <Image
        style={{ width: 100, height: 100 }}
        source={require("../../assets/ap_512by512.png")}
      />
    ),
    headerTitleStyle: { textAlign: "center", alignSelf: "center" }
  };
  render() {
    const { fetching, error, selectedExhibition } = this.props.exhibitions;
    const { fetchingAds, adverterror, advertData } = this.props.adverts;
    console.log(
      "You have Selected *************************" + selectedExhibition.title
    );
    const { id } = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;

    const renderIntendToEnter = () =>
      selectedExhibition.IntendedToEnter ? (
        <Text style={styles.intendToEnterText}>
          {selectedExhibition.IntendedToEnter
            ? "Will You Enter This Prize"
            : null}
        </Text>
      ) : (
        <Text style={{ color: "black" }}>{"Will You Enter This Prize"}</Text>
      );
    const renderFollowCount = () => (
      <Text
        style={this.state.watchCount ? styles.followText : { color: "black" }}
      >
        {this.state.watchCount ? "Unwatch" : "Watch"}
      </Text>
    );
    return (
      <View style={styles.wrapper}>
        <ScrollView>
          <TouchableOpacity onPress={() => navigate("Feed")}>
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 17,
                color: "#007AFF",
                marginTop: 30,
                flex: 1,
                left: 35,
                top: 0
              }}
            >
              Back
            </Text>
            <Ionicons
              name="ios-arrow-back"
              size={24}
              color="#007AFF"
              style={{
                top: 30,
                marginLeft: 20,
                position: "absolute",
                left: 0
              }}
            />
          </TouchableOpacity>

          <Image
            style={{
              resizeMode: "contain",
              height: 400,
              backgroundColor: "#428bca"
            }}
            source={{
              uri:
                `https://art-prizes.com/` + this.state.selectedExhibitionImage
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <TouchableOpacity style={{ borderRightWidth: 0.5, padding: 10 }}>
              <Text onPress={() => this.handleWatchList(id)}>
                <MaterialCommunityIcons name="set-none" size={18} />
                {renderFollowCount()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ borderRightWidth: 0.5, padding: 10 }}>
              <Text onPress={() => this.handleEnterPrizes(id)}>
                <FontAwesome
                  name="user"
                  type="font-awesome"
                  size={16}
                  color="#bdc3c7"
                />
                {renderIntendToEnter()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10 }}>
              <Text
                onPress={this.shareLinkWithShareDialog.bind(this)}
                style={{ color: "#3B5998" }}
              >
                <Image
                  source={require("../../assets/ic_share_black_24px.png")}
                />
                Share
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text
              style={{
                fontSize: 18,
                color: "black",
                textAlign: "center",
                margin: 20,
                fontWeight: "bold"
              }}
            >
              {selectedExhibition.title}
            </Text>
            <Text style={{ textAlign: "center" }}>
              {selectedExhibition.state} {selectedExhibition.country}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "#007AFF"
              }}
            >
              {distanceInWordsStrict(selectedExhibition.close_date, new Date())}{" "}
              {new Date(selectedExhibition.close_date).getTime() >
              new Date().getTime()
                ? " to go"
                : "ago"}
            </Text>
            <View style={styles.container}>
              <View>
                <FontAwesome
                  name="clock-o"
                  size={20}
                  color="black"
                  style={styles.icons}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Application Close</Text>
                <Text style={styles.titleContents}>
                  {format(selectedExhibition.close_date, "DD MMM YYYY")}
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <View>
                <FontAwesome
                  name="clock-o"
                  size={20}
                  color="black"
                  style={styles.icons}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Application dates</Text>
                <Text style={styles.titleContents}>
                  {format(
                    selectedExhibition.ApplicationsStartDate,
                    "DD MMM YYYY"
                  )}{" "}
                  - {format(selectedExhibition.close_date, "DD MMM YYYY")}
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <View>
                <FontAwesome
                  name="bullhorn"
                  size={20}
                  color="black"
                  style={styles.icons}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Announced</Text>
                <Text style={styles.titleContents}>
                  {format(
                    selectedExhibition.ExhibitionStartDate,
                    "DD MMM YYYY"
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <View>
                <FontAwesome
                  name="money"
                  size={20}
                  color="black"
                  style={styles.icons}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Prize money</Text>
                <Text style={styles.titleContents}>
                  {selectedExhibition.currency}
                  {parseInt(selectedExhibition.prize_money).toLocaleString(
                    "en"
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <View>
                <Entypo
                  name="location"
                  size={20}
                  color="black"
                  style={styles.icons}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Venue </Text>
                <Text
                  style={styles.titleContents}
                  onPress={() =>
                    Linking.openURL(
                      `http://maps.apple.com/?q=${
                        selectedExhibition.latitude
                      },${selectedExhibition.longtitude}`
                    )
                  }
                >
                  {selectedExhibition.venue}{" "}
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <View>
                <FontAwesome
                  name="pencil-square"
                  size={20}
                  color="black"
                  style={styles.icons}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Prize Genre </Text>
                <Text style={styles.titleContents}>
                  {selectedExhibition.prize_type}
                </Text>
              </View>
            </View>

            <View style={styles.container}>
              <View>
                <FontAwesome
                  name="users"
                  size={20}
                  color="black"
                  style={styles.icons}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Judges </Text>
                <Text style={styles.titleContents}>
                  {selectedExhibition.judges}
                </Text>
              </View>
            </View>

            <View style={styles.container}>
              <View>
                <FontAwesome
                  name="dollar"
                  size={20}
                  color="black"
                  style={styles.icons}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Fees and Commission </Text>
                <Text style={styles.titleContents}>
                  <Text style={styles.titleContents}>
                    {selectedExhibition.fees_and_commission}
                  </Text>
                </Text>
              </View>
            </View>

            <View style={styles.container}>
              <View>
                <FontAwesome
                  name="bell"
                  size={20}
                  color="black"
                  style={styles.icons}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Finalist Notified</Text>
                <Text style={styles.titleContents}>
                  {format(
                    selectedExhibition.finalists_notified_date,
                    "DD MMM YYYY"
                  )}
                </Text>
              </View>
            </View>

            <View style={styles.container}>
              <View>
                <Entypo
                  name="retweet"
                  size={20}
                  color="black"
                  style={styles.icons}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Frequency</Text>
                <Text style={styles.titleContents}>
                  {selectedExhibition.frequency}
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <View>
                <FontAwesome
                  name="trophy"
                  size={20}
                  color="black"
                  style={styles.icons}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Past Winners</Text>
                <Text style={styles.titleContents}>
                  {selectedExhibition.past_winners}
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <View>
                <EvilIcons
                  name="refresh"
                  size={20}
                  style={styles.icons}
                  color="black"
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Last updated </Text>
                <Text style={styles.titleContents}>
                  {format(selectedExhibition.updated, "DD MMM YYYY")}
                </Text>
              </View>
            </View>
            <View />
            <View style={styles.container}>
              <View>
                <Foundation
                  name="web"
                  size={20}
                  style={styles.icons}
                  color="black"
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Website</Text>
                <Text
                  style={styles.titleContents}
                  onPress={() => Linking.openURL(`${selectedExhibition.URL}`)}
                >
                  {selectedExhibition.URL}{" "}
                  <FontAwesome
                    name="link"
                    size={20}
                    style={styles.icons}
                    color="black"
                  />
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <View>
                <MaterialIcons
                  name="description"
                  size={20}
                  style={styles.icons}
                  color="black"
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.title}>Description</Text>
              </View>
            </View>
            <ScrollView>
              <HTML
                html={selectedExhibition.description}
                uri={selectedExhibition.description}
                imagesMaxWidth={Dimensions.get("window").width}
                containerStyle={{ marginLeft: 50, marginRight: 50 }}
              />
            </ScrollView>
            <Image
              source={require("../../assets/ArtPrizes.png")}
              style={{ width: 100, height: 100, alignSelf: "center" }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    exhibitions: state.exhibitions,
    adverts: state.adverts
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchExhibitionId,
      fetchExhibitionIdSuccess,
      fetchExhibitionIdError,
      intentToEnterExhibitions,
      fetchAdverts,
      fetcAdvertsSuccess,
      fetcAdvertsError,
      watchListExhibitions
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  matchDispatchToProps
)(ExhibitionDescription);
