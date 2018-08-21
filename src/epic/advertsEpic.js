import { Observable } from 'rxjs/Observable';
import { FETCH_ADVERTS, FETCH_ADVERT_BY_ID } from '../constants/constants';
import {
  fetcAdvertsSuccess,
  fetcAdvertsError,
  fetchAdvertIdSuccess,
  fetchAdvertIdError,
  authSetToken,
} from '../actions/actions';
import Api from '../utils/Api';

export const advertsEpic = action$ =>
  action$.ofType('FETCH_ADVERTS').mergeMap(action =>
    Api.getAdvertising()
      .map(fetcAdvertsSuccess)
      .catch(error => Observable.of(fetcAdvertsError(error))),);
export const advertsByIDEpic = action$ =>
  action$.ofType('FETCH_ADVERT_BY_ID').mergeMap(action =>
    Api.getAdvert(action.payload.id)
      .map(fetchAdvertIdSuccess)
      .catch(error => Observable.of(fetchAdvertIdError(error))),);
