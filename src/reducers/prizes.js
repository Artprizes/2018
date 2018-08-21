import {
  ALL_PRIZES,
  ALL_PRIZES_SUCCESS,
  ALL_PRIZES_ERROR,
  GET_HIDDEN_PRIZES,
  GET_HIDDEN_PRIZES_SUCCESS,
  GET_HIDDEN_PRIZES_ERROR,
  SHOW_PRIZES,
  SORT_TYPE,
  FILTER_TYPE,
  FETCH_PRIZE_BY_ID,
  FETCH_PRIZE_BY_ID_SUCCESS,
  FETCH_PRIZES_BY_ID_ERROR,
  INTENT_TO_ENTER_PRIZES_BY_ID,
  INTENT_TO_ENTER_PRIZES_BY_ID_SUCCESS,
  INTENT_TO_ENTER_PRIZES_BY_ID_ERROR,
  FOLLOW_COUNT_PRIZES_BY_ID,
  FOLLOW_COUNT_PRIZES_BY_ID_SUCCESS,
  FOLLOW_COUNT_PRIZES_BY_ID_ERROR,
  GET_USER_TOKEN
} from '../constants/constants';
import { AsyncStorage } from 'react-native';

const initialState = {
  prizeList: [],
  allPrizeList: [],
  selectedPrize: [],
  fetching: false,
  loading: false,
  error: null,
  error1: null,
  filterSearch: null,
  filterSort: null,
  filterType: []
};

export default function prizesReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_PRIZES:
      return {
        ...state,
        fetching: true,
        error: null
      };

    case ALL_PRIZES_SUCCESS:
      return {
        ...state,
        fetching: false,
        prizeList: action.payload.response
      };

    case ALL_PRIZES_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };

    case GET_HIDDEN_PRIZES:
      return {
        ...state,
        loading: true,
        error1: null
      };

    case GET_HIDDEN_PRIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        allPrizeList: action.payload.data
      };

    case GET_HIDDEN_PRIZES_ERROR:
      return {
        ...state,
        loading: false,
        error1: action.payload
      };
    case SHOW_PRIZES:
      return {
        ...state,
        prizes: [],
        filterSearch: action.payload
      };
    case SORT_TYPE:
      return {
        ...state,
        prizes: [],
        filterSort: action.payload
      };
    case FILTER_TYPE: {
      if (state.filterType.includes(action.payload)) {
        return {
          ...state,
          filterType: state.filterType.filter(val => val !== action.payload)
        };
      }
      return {
        ...state,
        filterType: [...state.filterType, action.payload]
      };
    }
    case 'CLEAR_FILTER':
      return {
        ...state,
        filterType: []
      };
    case 'CLEAR_SORT':
      return {
        ...state,
        filterSort: []
      };
    case FETCH_PRIZE_BY_ID:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case FETCH_PRIZE_BY_ID_SUCCESS:
      return {
        ...state,
        fetching: false,
        selectedPrize: action.payload.response
      };
    case FETCH_PRIZES_BY_ID_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };

    case INTENT_TO_ENTER_PRIZES_BY_ID:
      return {
        ...state,
        fetching: true,
        error: action.payload
      };

    case INTENT_TO_ENTER_PRIZES_BY_ID_SUCCESS:
      return {
        ...state,
        fetching: false
      };

    case INTENT_TO_ENTER_PRIZES_BY_ID_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    case FOLLOW_COUNT_PRIZES_BY_ID:
      return {
        ...state,
        fetching: true,
        error: action.payload
      };

    case FOLLOW_COUNT_PRIZES_BY_ID_SUCCESS:
      return {
        ...state,
        fetching: false
      };

    case FOLLOW_COUNT_PRIZES_BY_ID_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    default:
      return state;
  }
}
