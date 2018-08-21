import { Observable } from 'rxjs/Observable';
import {
  ALL_PRIZES,
  GET_HIDDEN_PRIZES,
  FETCH_PRIZE_BY_ID,
  INTENT_TO_ENTER_PRIZES_BY_ID,
  FOLLOW_COUNT_PRIZES_BY_ID
} from '../constants/constants';
import {
  fetchPrizesSuccess,
  fetchPrizesError,
  fetchAllPrizesSuccess,
  fetchAllPrizesError,
  fetchPrizeIdSuccess,
  fetchPrizeIdError,
  intentToEnterPrizesSuccess,
  intentToEnterPrizesError,
  followCountPrizesSuceess,
  followCountPrizesError,
  authSetToken
} from '../actions/actions';
import Api from '../utils/Api';

export const prizesEpic = action$ =>
  action$.ofType('ALL_PRIZES').mergeMap(action =>
    Api.getAllPrizes()
      .map(fetchPrizesSuccess)
      .catch(error => Observable.of(fetchPrizesError(error))));

export const allPrizesEpic = action$ =>
  action$.ofType('GET_HIDDEN_PRIZES').mergeMap(action =>
    Api.getHiddenPrizes()
      .map(fetchAllPrizesSuccess)
      .catch(error => Observable.of(fetchAllPrizesError(error))));

export const prizeByIDEpic = action$ =>
  action$.ofType('FETCH_PRIZE_BY_ID').mergeMap(action =>
    Api.getPrize(action.payload.id)
      .map(fetchPrizeIdSuccess)
      .catch(error => Observable.of(fetchPrizeIdError(error))));

export const intentToEnterEpic = action$ =>
  action$.ofType('INTENT_TO_ENTER_PRIZES_BY_ID').mergeMap(action =>
    Api.setCount(action.payload.id, action.payload.flag)
      .map(intentToEnterPrizesSuccess)
      .catch(error => Observable.of(intentToEnterPrizesError(error))));

export const watchListEpic = action$ =>
  action$.ofType('FOLLOW_COUNT_PRIZES_BY_ID').mergeMap(action =>
    Api.setWatchList(action.payload.id, action.payload.flag)
      .map(followCountPrizesSuceess)
      .catch(error => Observable.of(followCountPrizesError(error))));
