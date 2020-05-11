import { UPDATE_APP, ADD_RECORD, UPDATE_RECORD, DELETE_RECORD } from "./types";

/*
  Updates the app state
*/
export const updateApp = (payload) => {
  return { type: UPDATE_APP, payload: payload };
};

export const addRecord = (payload) => {
  return { type: ADD_RECORD, payload: payload };
};

export const deleteRecord = (payload) => {
  return { type: DELETE_RECORD, payload: payload };
};

export const updateRecord = (payload) => {
  return { type: UPDATE_RECORD, payload: payload };
};
