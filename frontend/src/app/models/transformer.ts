import {TransformerBand} from './transformerBand';

export interface Transformer {
  id: string;
  name: string;
  band: TransformerBand;
  strength: number;
  intelligence: number;
  speed: number;
  endurance: number;
  rank: number;
  courage: number;
  firepower: number;
  skill: number;
}
