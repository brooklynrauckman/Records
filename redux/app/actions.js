import { UPDATE_APP, ADD_RECORD } from "./types";

/*
  Updates the app state
*/
export const updateApp = (payload) => {
  return { type: UPDATE_APP, payload: payload };
};

export const addRecord = (payload) => {
  return { type: ADD_RECORD, payload: payload };
};
