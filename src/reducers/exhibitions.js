import {
  ALL_EXHIBITIONS,
  ALL_EXHIBITIONS_SUCCESS,
  ALL_EXHIBITIONS_ERROR,
  GET_HIDDEN_PRIZES,
  GET_HIDDEN_PRIZES_SUCCESS,
  GET_HIDDEN_PRIZES_ERROR,
  SHOW_EXHIBITIONS,
  EXHIBITION_SORT_TYPE,
  EXHIBITION_FILTER_TYPE,
  FILTER_TYPE,
  FETCH_EXHIBITION_BY_ID,
  FETCH_EXHIBITION_BY_ID_SUCCESS,
  FETCH_EXHIBITION_BY_ID_ERROR
} from '../constants/constants';

const initialState = {
  exhibitionList: [],
  allPrizeList: [],
  selectedExhibition: [],
  fetching: false,
  error: null,
  filterSearch: null,
  filterSort: null,
  filterType: []
};

export default function exhibitionsReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_EXHIBITIONS:
      return {
        ...state,
        fetching: true,
        error: null
      };

    case ALL_EXHIBITIONS_SUCCESS:
      return {
        ...state,
        fetching: false,
        exhibitionList: action.payload.response
      };

    case ALL_EXHIBITIONS_ERROR:
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
    case SHOW_EXHIBITIONS:
      return {
        ...state,
        exhibitions: [],
        filterSearch: action.payload
      };
    case EXHIBITION_SORT_TYPE:
      return {
        ...state,
        exhibitions: [],
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
    case FETCH_EXHIBITION_BY_ID:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case FETCH_EXHIBITION_BY_ID_SUCCESS:
      return {
        ...state,
        fetching: false,
        selectedExhibition: action.payload.response
      };
    case FETCH_EXHIBITION_BY_ID_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
    default:
      return state;
  }
}
