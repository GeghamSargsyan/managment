import {
  driversInfoLoadingType,
  driversInfoSuccessType,
  driversInfoFailureType
} from "../types";
const initialState = {
  data: {},
  isLoading: false,
  errorMsg: ""
};

export function driversInfoReducer(state = initialState, action) {
  switch (action.type) {
    case driversInfoLoadingType:
      return {
        ...state,
        isLoading: true
      };

    case driversInfoSuccessType:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };

    case driversInfoFailureType:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        errorMsg: action.errorMsg
      };

    default:
      return state;
  }
}
