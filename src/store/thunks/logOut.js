import { fetchLogOut } from "api";
import { loading, finishLoading } from "../actions";

export const logOut = () => async dispatch => {
  try {
    dispatch(loading());
    await fetchLogOut();
    if (window?.sessionStorage) {
      window.sessionStorage.removeItem("token");
      window.location.reload();
    }
  } catch (error) {
    console.error(error, "error");
  } finally {
    dispatch(finishLoading());
  }
};
