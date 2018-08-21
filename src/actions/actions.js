import {
  // CONSTANTS FOR PRIZES
  ALL_PRIZES,
  ALL_PRIZES_SUCCESS,
  ALL_PRIZES_ERROR,
  GET_HIDDEN_PRIZES,
  GET_HIDDEN_PRIZES_SUCCESS,
  GET_HIDDEN_PRIZES_ERROR,
  SHOW_PRIZES,
  SORT_TYPE,
  FILTER_TYPE,
  FETCH_ADVERTS,
  FETCH_ADVERTS_SUCCESS,
  FETCH_ADVERTS_ERROR,
  FETCH_PRIZE_BY_ID,
  FETCH_PRIZE_BY_ID_SUCCESS,
  FETCH_PRIZES_BY_ID_ERROR,
  FETCH_ADVERT_BY_ID,
  FETCH_ADVERT_BY_ID_SUCCESS,
  FETCH_ADVERT_BY_ID_ERROR,
  INTENT_TO_ENTER_PRIZES_BY_ID,
  INTENT_TO_ENTER_PRIZES_BY_ID_SUCCESS,
  INTENT_TO_ENTER_PRIZES_BY_ID_ERROR,
  FOLLOW_COUNT_PRIZES_BY_ID,
  FOLLOW_COUNT_PRIZES_BY_ID_SUCCESS,
  FOLLOW_COUNT_PRIZES_BY_ID_ERROR,

  // CONSTANTS FOR EXHIBITIONS....
  ALL_EXHIBITIONS,
  ALL_EXHIBITIONS_SUCCESS,
  ALL_EXHIBITIONS_ERROR,
  SHOW_EXHIBITIONS,
  EXHIBITION_SORT_TYPE,
  EXHIBITION_FILTER_TYPE,
  FETCH_EXHIBITION_BY_ID,
  FETCH_EXHIBITION_BY_ID_SUCCESS,
  FETCH_EXHIBITION_BY_ID_ERROR,
  INTENT_TO_ENTER_EXHIBITIONS_BY_ID,
  INTENT_TO_ENTER_EXHIBITIONS_BY_ID_SUCCESS,
  INTENT_TO_ENTER_EXHIBITIONS_BY_ID_ERROR,
  FOLLOW_COUNT_EXHIBITIONS_BY_ID,
  FOLLOW_COUNT_EXHIBITIONS_BY_ID_SUCCESS,
  FOLLOW_COUNT_EXHIBITIONS_BY_ID_ERROR
} from '../constants/constants';
// import { AsyncStorage } from 'react-native';

export const fetchPrizes = () => ({
  type: 'ALL_PRIZES'
});

export const fetchPrizesSuccess = data => ({
  type: 'ALL_PRIZES_SUCCESS',
  payload: data
});

export const fetchPrizesError = error => ({
  type: 'ALL_PRIZES_ERROR',
  payload: error
});
export const fetchAllPrizes = () => ({
  type: 'GET_HIDDEN_PRIZES'
});

export const fetchAllPrizesSuccess = data => ({
  type: 'GET_HIDDEN_PRIZES_SUCCESS',
  payload: data
});

export const fetchAllPrizesError = error => ({
  type: 'GET_HIDDEN_PRIZES_ERROR',
  payload: error
});
export const showPrizes = data => ({
  type: 'SHOW_PRIZES',
  payload: data
});

export const dataSort = data => ({
  type: 'SORT_TYPE',
  payload: data
});

export const dataFilter = data => ({
  type: 'FILTER_TYPE',
  payload: data
});

export const clearFilter = () => ({
  type: 'CLEAR_FILTER'
});
export const clearSort = () => ({
  type: 'CLEAR_SORT'
});

export const fetchAdverts = () => ({
  type: 'FETCH_ADVERTS'
});

export const fetcAdvertsSuccess = data => ({
  type: 'FETCH_ADVERTS_SUCCESS',
  payload: data
});

export const fetcAdvertsError = error => ({
  type: 'FETCH_ADVERTS_ERROR',
  payload: error
});

export const fetchPrizeId = id => ({
  type: 'FETCH_PRIZE_BY_ID',
  payload: id
});

export const fetchPrizeIdSuccess = data => ({
  type: 'FETCH_PRIZE_BY_ID_SUCCESS',
  payload: data
});

export const fetchPrizeIdError = error => ({
  type: 'FETCH_PRIZES_BY_ID_ERROR',
  payload: error
});

export const fetchAdvertId = id => ({
  type: 'FETCH_ADVERT_BY_ID',
  payload: id
});

export const fetchAdvertIdSuccess = data => ({
  type: 'FETCH_ADVERT_BY_ID_SUCCESS',
  payload: data
});

export const fetchAdvertIdError = error => ({
  type: 'FETCH_ADVERT_BY_ID_ERROR',
  payload: error
});

export const intentToEnterPrizes = (id, flag) => ({
  type: 'INTENT_TO_ENTER_PRIZES_BY_ID',
  payload: { id, flag }
});

export const intentToEnterPrizesSuccess = data => ({
  type: 'INTENT_TO_ENTER_PRIZES_BY_ID_SUCCESS',
  payload: data
});

export const intentToEnterPrizesError = error => ({
  type: 'INTENT_TO_ENTER_PRIZES_BY_ID_ERROR',
  payload: error
});

export const watchListPrizes = (id, flag) => ({
  type: 'FOLLOW_COUNT_PRIZES_BY_ID',
  payload: { id, flag }
});

export const followCountPrizesSuceess = data => ({
  type: 'FOLLOW_COUNT_PRIZES_BY_ID_SUCCESS',
  payload: data
});

export const followCountPrizesError = error => ({
  type: 'FOLLOW_COUNT_PRIZES_BY_ID_ERROR',
  payload: error
});

// EXHIBITION SECTION.......

export const fetchExhibitions = () => ({
  type: 'ALL_EXHIBITIONS'
});

export const fetchExhibitionsSuccess = data => ({
  type: 'ALL_EXHIBITIONS_SUCCESS',
  payload: data
});

export const fetchExhibitionsError = error => ({
  type: 'ALL_EXHIBITIONS_ERROR',
  payload: error
});

export const showExhibitions = data => ({
  type: 'SHOW_EXHIBITIONS',
  payload: data
});

export const dataSortExhibitions = data => ({
  type: 'EXHIBITION_SORT_TYPE',
  payload: data
});

export const dataFilterExhibitions = data => ({
  type: 'EXHIBITION_FILTER_TYPE',
  payload: data
});

export const fetchExhibitionId = id => ({
  type: 'FETCH_EXHIBITION_BY_ID',
  payload: id
});

export const fetchExhibitionIdSuccess = data => ({
  type: 'FETCH_EXHIBITION_BY_ID_SUCCESS',
  payload: data
});

export const fetchExhibitionIdError = error => ({
  type: 'FETCH_EXHIBITION_BY_ID_ERROR',
  payload: error
});

export const intentToEnterExhibitions = (id, flag) => ({
  type: 'INTENT_TO_ENTER_EXHIBITIONS_BY_ID',
  payload: { id, flag }
});

export const intentToEnterExhibitionsSuccess = data => ({
  type: 'INTENT_TO_ENTER_EXHIBITIONS_BY_ID_SUCCESS',
  payload: data
});

export const intentToEnterExhibitionsError = error => ({
  type: 'INTENT_TO_ENTER_PRIZES_BY_ID_ERROR',
  payload: error
});
export const watchListExhibitions = (id, flag) => ({
  type: 'FOLLOW_COUNT_EXHIBITIONS_BY_ID',
  payload: { id, flag }
});

export const followCountExhibitionsSuceess = data => ({
  type: 'FOLLOW_COUNT_EXHIBITIONS_BY_ID_SUCCESS',
  payload: data
});

export const followCountExhibitionsError = error => ({
  type: 'INTENT_TO_ENTER_EXHIBITIONS_BY_ID_ERROR',
  payload: error
});
