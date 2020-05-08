import {Transformer} from '../../models/transformer';
import * as uuid from 'uuid';
import {TransformerBand} from '../../models/transformerBand';

export interface ParticipantsState {
  autobots: Transformer[];
  decepticons: Transformer[];
}

export const initialParticipantsState = {
  autobots: [],
  decepticons: []
  /*
  autobots: [
    {
      id: uuid.v4(),
      name: 'Bluestreak',
      band: TransformerBand.A,
      strength: 6,
      intelligence: 6,
      speed: 7,
      endurance: 9,
      rank: 5,
      courage: 2,
      firepower: 9,
      skill: 7
    } as Transformer,
    {
      id: uuid.v4(),
      name: 'Bummblebee',
      band: TransformerBand.A,
      strength: 7,
      intelligence: 10,
      speed: 9,
      endurance: 9,
      rank: 8,
      courage: 8,
      firepower: 4,
      skill: 8
    } as Transformer
  ],
  decepticons: [
    {
      id: uuid.v4(),
      name: 'Soundwave',
      band: TransformerBand.D,
      strength: 8,
      intelligence: 9,
      speed: 2,
      endurance: 6,
      rank: 7,
      courage: 5,
      firepower: 6,
      skill: 10
    } as Transformer
  ]
   */
};

