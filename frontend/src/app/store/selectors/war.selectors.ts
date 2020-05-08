import {AppState} from '../state/app.state';
import {createSelector} from '@ngrx/store';
import {WarState} from '../state/war.state';

const selectWar = (state: AppState) => state.war;

export const warState = selectWar;

export const selectAutobots = createSelector(
  selectWar,
  (state: WarState) => state.autobots
);

export const selectDecepticons = createSelector(
  selectWar,
  (state: WarState) => state.decepticons
);

export const selectIsCompleted = createSelector(
  selectWar,
  (state: WarState) => state.isCompleted
);
