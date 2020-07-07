import { loginLoadingType, loginSuccessType, loginFailureType } from "../types";

export const loginLoading = () => ({
  type: loginLoadingType
});

export const loginSuccess = payload => ({
  type: loginSuccessType,
  payload
});

export const loginFailure = errorMsg => ({
  type: loginFailureType,
  errorMsg
});
