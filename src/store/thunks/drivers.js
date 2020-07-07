import { fetchDriversInfo } from "api";

import {
  driversInfoFailure,
  driversInfoLoading,
  driversInfoSuccess
} from "store/actions";

export const getDrivers = driverId => async dispatch => {
  try {
    dispatch(driversInfoLoading());
    const dispatchData = data => dispatch(driversInfoSuccess(data));
    await fetchDriversInfo(driverId, dispatchData);
  } catch (error) {
    dispatch(driversInfoFailure("error"));
    console.error(error, "error");
  }
};
