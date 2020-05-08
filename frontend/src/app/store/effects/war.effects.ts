import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {BattleService} from '../../battle.service';
import {Store} from '@ngrx/store';
import {BattleResult, EWarActions, FightBattle} from '../actions/war.actions';
import {map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class WarEffects {
  @Effect()
  fightBattle$ = this.actions.pipe(
    ofType<FightBattle>(EWarActions.FightBattle),
    map((action) => action.payload),
    mergeMap((battle) => this.battleService.fightBattle(battle)),
    mergeMap((updatedBattle) => of(new BattleResult(updatedBattle)))
  );

  constructor(private battleService: BattleService,
              private actions: Actions,
              private store: Store) {}
}

