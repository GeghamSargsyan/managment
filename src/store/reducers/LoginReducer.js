import { loginLoadingType, loginSuccessType, loginFailureType } from "../types";

const currentUser = window.sessionStorage.getItem("token");

const initialState = {
  data: { ...(JSON.parse(currentUser) || {}) },
  isLoading: false,
  errorMsg: ""
};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case loginLoadingType:
      return {
        ...state,
        isLoading: true
      };

    case loginSuccessType:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };

    case loginFailureType:
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
