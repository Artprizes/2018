import {
  FETCH_ADVERTS,
  FETCH_ADVERTS_SUCCESS,
  FETCH_ADVERTS_ERROR,
  FETCH_ADVERT_BY_ID,
  FETCH_ADVERT_BY_ID_SUCCESS,
  FETCH_ADVERT_BY_ID_ERROR,
} from '../constants/constants';

const initialState = {
  advertData: [],
  selectedAd: [],
  fetchingAds: false,
  advertError: null,
  advertIdError: null,
};

export default function advertsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ADVERTS:
      return {
        ...state,
        fetchingAds: true,
        advertError: null,
      };

    case FETCH_ADVERTS_SUCCESS:
      return {
        ...state,
        fetchingAds: false,
        advertData: action.payload.response,
      };

    case FETCH_ADVERTS_ERROR:
      return {
        ...state,
        fetchingAds: false,
        advertError: action.payload,
      };

    case FETCH_ADVERT_BY_ID:
      return {
        ...state,
        fetchingAds: true,
        advertIdError: null,
      };

    case FETCH_ADVERT_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingAds: false,
        selectedAd: action.payload.response,
      };

    case FETCH_ADVERT_BY_ID_ERROR:
      return {
        ...state,
        fetchingAds: false,
        advertIdError: action.payload,
      };
    default:
      return state;
  }
}
