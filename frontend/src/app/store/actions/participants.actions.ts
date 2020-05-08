import {Action} from '@ngrx/store';
import {TransformerBattle} from '../../models/transformerBattle';
import {Transformer} from '../../models/transformer';

export enum EParticipantsActions {
  AddParticipant = '[Participants] Add Participant',
  RemoveParticipant = '[Participants] Remove Participant',
  UpdateParticipant = '[Participants] Update Participant'
}

export class AddParticipant implements Action {
  public readonly type = EParticipantsActions.AddParticipant;

  constructor(public payload: Transformer) {}
}

export class RemoveParticipant implements Action {
  public readonly type = EParticipantsActions.RemoveParticipant;

  constructor(public payload: Transformer) {}
}

export class UpdateParticipant implements Action {
  public readonly type = EParticipantsActions.UpdateParticipant;

  constructor(public payload: Transformer) {}
}

export type ParticipantsActions = AddParticipant | RemoveParticipant | UpdateParticipant;
