import {initialWarState, WarState} from '../state/war.state';
import {EWarActions, WarActions} from '../actions/war.actions';
import {TransformerBattle} from '../../models/transformerBattle';
import {TransformerBand} from '../../models/transformerBand';

const SPECIAL_NAMES = ['optimus prime', 'predaking'];

export const warReducers =
  (state = initialWarState, action: WarActions): WarState => {
  switch (action.type) {
    case EWarActions.BeginWar: {
      const sortedAutobots = [...action.payload.autobots].sort((a, b) => b.rank - a.rank);
      const sortedDecepticons = [...action.payload.decepticons].sort((a, b) => b.rank - a.rank);
      const battles: TransformerBattle[] = [];
      const maxLen = Math.max(sortedAutobots.length, sortedDecepticons.length);
      let unchallengedAutobots = 0;
      let unchallengedDecepticons = 0;
      let sentinelBattle = false;
      for (let i = 0; i < maxLen; i++) {
        if (i < sortedAutobots.length && i < sortedDecepticons.length) {
          if (SPECIAL_NAMES.indexOf(sortedAutobots[i].name.toLowerCase()) >= 0 &&
              SPECIAL_NAMES.indexOf(sortedDecepticons[i].name.toLowerCase()) >= 0) {
            sentinelBattle = true;
          }
          battles.push({
            autobot: sortedAutobots[i],
            decepticon: sortedDecepticons[i],
            boutNumber: i
          } as TransformerBattle);
        }
        if (i >= sortedAutobots.length) {
          unchallengedDecepticons++;
        }
        if (i >= sortedDecepticons.length) {
          unchallengedAutobots++;
        }
      }

      if (sentinelBattle) {
        const newWarState = {
          isCompleted: true,
          autobots: sortedAutobots,
          decepticons: sortedDecepticons,
          battles,
          unchallengedAutobots: 0,
          unchallengedDecepticons: 0,
          eliminatedAutobots: sortedAutobots.length,
          eliminatedDecepticons: sortedDecepticons.length
        };
        // console.log(`newWarState <sentinelBattle>: ${JSON.stringify(newWarState)}`);
        return newWarState;
      } else {
        const newWarState = {
          isCompleted: false,
          autobots: sortedAutobots,
          decepticons: sortedDecepticons,
          battles,
          unchallengedAutobots,
          unchallengedDecepticons,
          eliminatedAutobots: 0,
          eliminatedDecepticons: 0
        };
        // console.log(`newWarState: ${JSON.stringify(newWarState)}`);
        return newWarState;
      }
    }
    case EWarActions.FightBattle: {
      // noop - handled by effect
      return state;
    }
    case EWarActions.BattleResult: {
      // console.log(`Got BattleResults for bout ${action.payload.boutNumber} winner ${action.payload.winner}`);
      const updatedBattles = state.battles.map((battle) => ({...battle}));
      updatedBattles[action.payload.boutNumber].winner = action.payload.winner;
      const newState = {
        ...state,
        battles: updatedBattles
      };
      newState.isCompleted = newState.battles.every((battle) => battle.winner);
      if (action.payload.winner === 'T') {
        // tie - both are destroyed
        newState.eliminatedAutobots++;
        newState.eliminatedDecepticons++;
      } else {
        switch (action.payload.winner) {
          case TransformerBand.A:
            newState.eliminatedDecepticons++;
            break;
          case TransformerBand.D:
            newState.eliminatedAutobots++;
            break;
        }
      }
      return newState;
    }
    case EWarActions.NextWar: {
      return initialWarState;
    }
    default:
      return state;
  }
};
