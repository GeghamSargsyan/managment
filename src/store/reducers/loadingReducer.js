import { loadingType, loadingFinishType } from "../types";

const initialState = {
  isLoading: false
};

export function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case loadingType:
      return {
        isLoading: true
      };

    case loadingFinishType:
      return {
        isLoading: false
      };

    default:
      return state;
  }
}
