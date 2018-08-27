import "rxjs";
import "rxjs/add/observable/dom/ajax";
import { Observable } from "rxjs/Observable";
import { AsyncStorage } from "react-native";
import axios from "axios";
class Api {
  setToken = token => {
    this.token = token;
  };

  call = (options = {}) => {
    // console.log(this.token);
    return Observable.ajax({
      ...options,
      url: `https://api.art-prizes.com/api${options.url}/${this.token}`
    });
  };

  getAdvertising = () => {
    return this.call({
      url: "/Advertising"
    });
  };
  getAdvert = advertId => {
    return this.call({
      url: `/Advertising/GetAdvertisment/${advertId}`
    });
  };

  getPrize = prizeId => {
    return this.call({
      url: `/artprize/GetPrize/${prizeId}`
    });
  };

  getAllPrizes = () => {
    return this.call({
      url: "/ArtPrize"
    });
  };

  getHiddenPrizes = () => {
    return Observable.fromPromise(
      axios.post(
        `https://api.art-prizes.com/api/artprize/allprizes/${this.token}`
      )
    );
  };
  getExhibiting = () => {
    return this.call({
      url: `/artprize/exhibiting`
    });
  };

  getExhibition = exhibitionId => {
    return this.call({
      url: `/artprize/GetPrize/${exhibitionId}`
    });
  };

  setCount = (prizeId, flag) => {
    return Observable.fromPromise(
      axios.put(
        `https://api.art-prizes.com/api/IntentToEnter/SetIntent/${prizeId}/${
          this.token
        }/${flag}`
      )
    );
  };

  setWatchList = (prizeId, flag) => {
    return Observable.fromPromise(
      axios.put(
        `https://api.art-prizes.com/api/WatchList/WatchUpdate/${prizeId}/${
          this.token
        }/${flag}`
      )
    );
  };
}

export default new Api();
