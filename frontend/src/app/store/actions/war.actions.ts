import {Action} from '@ngrx/store';
import {TransformerBattle} from '../../models/transformerBattle';
import {Transformer} from '../../models/transformer';
import {TransformerWar} from '../../models/transformerWar';

export enum EWarActions {
  BeginWar = '[War] Begin War',
  FightBattle = '[War] Fight Battle',
  BattleResult = '[War] Battle Result',
  NextWar = '[War] Next War'
}

export class BeginWar implements Action {
  public readonly type = EWarActions.BeginWar;

  constructor(public payload: TransformerWar) {}
}

export class FightBattle implements Action {
  public readonly type = EWarActions.FightBattle;

  constructor(public payload: TransformerBattle) {}
}

export class BattleResult implements Action {
  public readonly type = EWarActions.BattleResult;

  constructor(public payload: TransformerBattle) {}
}

export class NextWar implements Action {
  public readonly type = EWarActions.NextWar;
}

export type WarActions = BeginWar | FightBattle | BattleResult | NextWar;
