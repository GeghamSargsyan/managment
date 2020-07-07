import {
  driversInfoLoadingType,
  driversInfoSuccessType,
  driversInfoFailureType
} from "../types";

export const driversInfoLoading = () => ({
  type: driversInfoLoadingType
});

export const driversInfoSuccess = payload => ({
  type: driversInfoSuccessType,
  payload
});

export const driversInfoFailure = errorMsg => ({
  type: driversInfoFailureType,
  errorMsg
});
