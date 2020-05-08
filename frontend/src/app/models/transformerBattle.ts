import {TransformerBand} from './transformerBand';
import {Transformer} from './transformer';

export interface TransformerBattle {
  autobot: Transformer;
  decepticon: Transformer;
  boutNumber?: number;
  winner?: TransformerBand | 'T';
}
