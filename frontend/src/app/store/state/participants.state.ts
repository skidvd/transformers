import {Transformer} from '../../models/transformer';
import * as uuid from 'uuid';
import {TransformerBand} from '../../models/transformerBand';

export interface ParticipantsState {
  autobots: Transformer[];
  decepticons: Transformer[];
}

/*
const autobots = [];
const decepticons = [];
for (let i = 0; i < 100; i++) {
  let id = uuid.v4();
  autobots.push({
    id,
    name: id,
    band: TransformerBand.A,
    strength: Math.floor((Math.random() * 10) + 1),
    intelligence: Math.floor((Math.random() * 10) + 1),
    speed: Math.floor((Math.random() * 10) + 1),
    endurance: Math.floor((Math.random() * 10) + 1),
    rank: Math.floor((Math.random() * 10) + 1),
    courage: Math.floor((Math.random() * 10) + 1),
    firepower: Math.floor((Math.random() * 10) + 1),
    skill: Math.floor((Math.random() * 10) + 1)
  });
  id = uuid.v4();
  decepticons.push({
    id,
    name: id,
    band: TransformerBand.D,
    strength: Math.floor((Math.random() * 10) + 1),
    intelligence: Math.floor((Math.random() * 10) + 1),
    speed: Math.floor((Math.random() * 10) + 1),
    endurance: Math.floor((Math.random() * 10) + 1),
    rank: Math.floor((Math.random() * 10) + 1),
    courage: Math.floor((Math.random() * 10) + 1),
    firepower: Math.floor((Math.random() * 10) + 1),
    skill: Math.floor((Math.random() * 10) + 1)
  });
}
 */
export const initialParticipantsState = {
  // autobots,
  // decepticons
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

