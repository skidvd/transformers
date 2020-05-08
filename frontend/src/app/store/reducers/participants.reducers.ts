import {initialParticipantsState, ParticipantsState} from '../state/participants.state';
import {EParticipantsActions, ParticipantsActions} from '../actions/participants.actions';
import {Transformer} from '../../models/transformer';
import {TransformerBand} from '../../models/transformerBand';

export const participantsReducers =
  (state = initialParticipantsState, action: ParticipantsActions): ParticipantsState => {
  const findParticipantIndexById = (participant: Transformer) => {
    switch (participant.band) {
      case TransformerBand.A: {
        return state.autobots.findIndex((t) => t.id === participant.id);
      }
      case TransformerBand.D: {
        return state.decepticons.findIndex((t) => t.id === participant.id);
      }
    }
  };
  switch (action.type) {
    case EParticipantsActions.AddParticipant: {
      switch (action.payload.band) {
        case TransformerBand.A: {
          const newAutoBots = [].concat(state.autobots);
          newAutoBots.push(action.payload);
          return {
            autobots: newAutoBots,
            decepticons: state.decepticons
          };
        }
        case TransformerBand.D: {
          const newDecepticons = [].concat(state.decepticons);
          newDecepticons.push(action.payload);
          return {
            autobots: state.autobots,
            decepticons: newDecepticons
          };
        }
      }
      break;
    }
    case EParticipantsActions.RemoveParticipant: {
      const index = findParticipantIndexById(action.payload);
      switch (action.payload.band) {
        case TransformerBand.A: {
          return {
            autobots: state.autobots.filter((t, i) => i !== index),
            decepticons: state.decepticons
          };
        }
        case TransformerBand.D: {
          return {
            autobots: state.autobots,
            decepticons: state.decepticons.filter((t, i) => i !== index)
          };
        }
      }
      return state;
    }
    case EParticipantsActions.UpdateParticipant: {
      const index = findParticipantIndexById(action.payload);
      switch (action.payload.band) {
        case TransformerBand.A: {
          const newAutoBots = [].concat(state.autobots);
          newAutoBots.splice(index, 1, action.payload);
          return {
            autobots: newAutoBots,
            decepticons: state.decepticons
          };
        }
        case TransformerBand.D: {
          const newDecepticons = [].concat(state.decepticons);
          newDecepticons.splice(index, 1, action.payload);
          return {
            autobots: state.autobots,
            decepticons: newDecepticons
          };
        }
      }
      return state;
    }
    default:
      return state;
  }
};
