import { UPDATE_APP, UPDATE_RECORD, ADD_RECORD, DELETE_RECORD } from "./types";
import { initialState } from "./initialState";

const recordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_APP: {
      return { ...state, ...action.payload };
    }
    case ADD_RECORD: {
      return {
        ...state,
        ...{ records: [...state.records, ...[action.payload]] },
      };
    }
    case DELETE_RECORD: {
      return {
        ...state,
        ...{
          records: state.records.filter(
            (record) => record.id !== action.payload.id
          ),
        },
      };
    }
    case UPDATE_RECORD: {
      return {
        ...state,
        ...{
          records: state.records.map((record) => {
            if (record.id === action.payload.id) return action.payload;
            else return record;
          }),
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default recordsReducer;

// function updateVeryNestedField(state, action) {
//   return {
//     ...state,
//     first: {
//       ...state.first,
//       second: {
//         ...state.first.second,
//         [action.someId]: {
//           ...state.first.second[action.someId],
//           fourth: action.someValue
//         }
//       }
//     }
//   }
// }
