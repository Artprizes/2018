import { combineEpics } from 'redux-observable';
import {
  prizesEpic,
  allPrizesEpic,
  prizeByIDEpic,
  intentToEnterEpic,
  watchListEpic
} from './prizesEpic';
import {
  exhibitionEpic,
  exhibitionByIdEpic,
  intentToEnterExhibitionsEpic,
  watchListExhibitionsEpic
} from './exhibitionEpic';
import { advertsEpic, advertsByIDEpic } from './advertsEpic';

const rootEpic = combineEpics(
  prizesEpic,
  allPrizesEpic,
  prizeByIDEpic,
  intentToEnterEpic,
  watchListEpic,
  exhibitionEpic,
  exhibitionByIdEpic,
  intentToEnterExhibitionsEpic,
  watchListExhibitionsEpic,
  advertsEpic,
  advertsByIDEpic
);

export default rootEpic;
