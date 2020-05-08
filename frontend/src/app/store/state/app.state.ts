import {ParticipantsState, initialParticipantsState} from './participants.state';
import {WarState, initialWarState} from './war.state';

export interface AppState {
  participants: ParticipantsState;
  war: WarState;
}

export const initialAppState = {
  participants: initialParticipantsState,
  war: initialWarState
};

export const getInitialState = () => {
  return initialAppState;
};
