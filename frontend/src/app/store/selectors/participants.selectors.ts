import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {ParticipantsState} from '../state/participants.state';

const selectParticipants = (state: AppState) => state.participants;

export const selectAutobots = createSelector(
  selectParticipants,
  (state: ParticipantsState) => state.autobots
);

export const selectDecepticons = createSelector(
  selectParticipants,
  (state: ParticipantsState) => state.decepticons
);

