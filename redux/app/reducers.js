import { UPDATE_APP, ADD_RECORD } from "./types";
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

    default: {
      return state;
    }
  }
};

export default recordsReducer;
