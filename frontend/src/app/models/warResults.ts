import {TransformerBand} from './transformerBand';

export interface WarResults {
  totalBattles: number;
  winningTeam: TransformerBand | 'Tie/Draw' | 'Tie/Draw - Special Rule: Game Ending Battle';
  winningSurvivors: string[];
  loosingSurvivors: string[];
}
