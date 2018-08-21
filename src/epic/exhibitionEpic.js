import { Observable } from 'rxjs/Observable';
import {
  ALL_EXHIBITIONS,
  FETCH_EXHIBITION_BY_ID,
  INTENT_TO_ENTER_EXHIBITIONS_BY_ID,
  FOLLOW_COUNT_EXHIBITIONS_BY_ID,
} from '../constants/constants';
import {
  fetchExhibitionsSuccess,
  fetchExhibitionsError,
  fetchExhibitionIdSuccess,
  fetchExhibitionIdError,
  intentToEnterExhibitions,
  intentToEnterExhibitionsSuccess,
  intentToEnterExhibitionsError,
  followCountExhibitions,
  followCountExhibitionsSuceess,
  followCountExhibitionsError,
} from '../actions/actions';
import Api from '../utils/Api';

export const exhibitionEpic = action$ =>
  action$.ofType('ALL_EXHIBITIONS').mergeMap((action) => {
    console.log(action);
    return Api.getExhibiting()
      .map(fetchExhibitionsSuccess)
      .catch(error => Observable.of(fetchExhibitionsError(error)));
  });

export const exhibitionByIdEpic = action$ =>
  action$.ofType('FETCH_EXHIBITION_BY_ID').mergeMap(action =>
    Api.getExhibition(action.payload.id)
      .map(fetchExhibitionIdSuccess)
      .catch(error => Observable.of(fetchExhibitionIdError(error))),);

export const intentToEnterExhibitionsEpic = action$ =>
  action$.ofType('INTENT_TO_ENTER_EXHIBITIONS_BY_ID').mergeMap(action =>
    Api.setCount(action.payload.id, action.payload.flag)
      .map(intentToEnterExhibitionsSuccess)
      .catch(error => Observable.of(intentToEnterExhibitionsError(error))),);

export const watchListExhibitionsEpic = action$ =>
  action$.ofType('FOLLOW_COUNT_EXHIBITIONS_BY_ID').mergeMap(action =>
    Api.setWatchList(action.payload.id, action.payload.flag)
      .map(followCountExhibitionsSuceess)
      .catch(error => Observable.of(followCountExhibitionsError(error))),);
