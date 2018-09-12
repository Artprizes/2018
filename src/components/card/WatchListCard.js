import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import styles from './style';
import { Icon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

class WatchListCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedColor: ''
    };
  }
  componentDidMount() {
    this._getRandomColor();
  }
  _getRandomColor() {
    const item = Math.floor(Math.random() * 16777216);
    this.setState({
      selectedColor: item
    });
  }
  render() {
    const {
      id,
      title,
      prizeAmount,
      country,
      state,
      sponsored,
      prizeLogo,
      prizeType,
      eligibility,
      currencyType,
      viewCount,
      followCount,
      intentionToEnterCount,
      daysCount,
      navigationFn
    } = this.props;
    // console.log(this.props, "props inside card component received from feed");

    const renderSponsored = () =>
      (sponsored ? (
        <View style={styles.sponsored}>
          <Text style={styles.sponsoredText}>
            {sponsored ? " sponsored " : null}
          </Text>
        </View>
      ) : null);
    const renderEligibility = () =>
      (eligibility ? (
        <View style={styles.subtitle}>
          <Text style={styles.subtitle}>
            Elligibility:
            {eligibility ? eligibility : "null"}
          </Text>
        </View>
      ) : null);
    const renderImages = () =>
      (prizeLogo != null ? (
        <View>
          <Image
            style={{ width: 80, height: 100 }}
            source={{
              uri: `https://art-prizes.com` + prizeLogo
            }}
          />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: this.state.selectedColor,
            width: 80,
            height: 100
          }}
        />
      ));

    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => navigationFn('WatchListDescription', { id })}
        >
          <View style={styles.container} key={id}>
            <View style={styles.imageAvtar}>{renderImages()}</View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.title}>{title.substr(0, 100)}</Text>
              <View
                style={{
                  flexDirection: 'row'
                }}
              >
                <Text style={styles.subtitle}>Genre: {prizeType}</Text>
                {/* <Text style={{ marginRight: 10 }}>
                  <Entypo name="chevron-right" size={24} color="#000000" />
                </Text> */}
              </View>
              <View
                style={{
                  flexDirection: 'row'
                }}
              >
                {renderEligibility()}
              </View>

              <View
                style={{
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    flexGrow: 5
                  }}
                >
                  <Icon
                    name="map-marker"
                    type="font-awesome"
                    size={12}
                    color="#5D5D5F"
                  />
                  <Text style={styles.values}>
                    {state} {country}
                  </Text>
                  <Text style={[styles.values, styles.numbers]}>
                    {daysCount} to go
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  <Entypo
                    name="eye"
                    size={12}
                    color="#5D5D5F"
                    style={{ marginTop: 3 }}
                  />
                  <Text style={styles.numbers}>{viewCount}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10
                  }}
                >
                  <MaterialCommunityIcons
                    name="set-none"
                    color="#5D5D5F"
                    size={12}
                    style={{ marginTop: 3 }}
                  />
                  <Text style={styles.numbers}>{followCount}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10
                  }}
                >
                  <Entypo
                    name="user"
                    type="font-awesome"
                    size={12}
                    color="#5D5D5F"
                    style={{ marginTop: 3 }}
                  />
                  <Text style={styles.numbers}>{intentionToEnterCount}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10
                  }}
                />
                <Text style={styles.values}>
                  {currencyType}
                  {prizeAmount.toLocaleString('en')}
                </Text>
              </View>
            </View>
            <View>
              <View>
                {renderSponsored()}
                {/* <Text style={{ marginLeft: 100 }}>
                  <Entypo name="chevron-right" size={24} color="#000000" />
                </Text> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default WatchListCard;
