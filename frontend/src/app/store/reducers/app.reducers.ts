import {ActionReducerMap} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {participantsReducers} from './participants.reducers';
import {warReducers} from './war.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  participants: participantsReducers,
  war: warReducers
};

