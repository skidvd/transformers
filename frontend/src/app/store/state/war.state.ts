import {Transformer} from '../../models/transformer';
import {TransformerBattle} from '../../models/transformerBattle';

export interface WarState {
  isCompleted: boolean;
  autobots?: Transformer[];
  decepticons?: Transformer[];
  battles?: TransformerBattle[];
  unchallengedAutobots?: number;
  unchallengedDecepticons?: number;
  eliminatedAutobots?: number;
  eliminatedDecepticons?: number;
}

export const initialWarState = undefined;
