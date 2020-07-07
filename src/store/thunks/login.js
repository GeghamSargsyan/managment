import { loginLoading, loginSuccess, loginFailure } from "../actions";
import { fetchLogin, fetchAdminInfo } from "../../api";

export const loginAction = (login, password) => async dispatch => {
  try {
    dispatch(loginLoading());

    const response = await fetchLogin(login, password);

    console.log(response);
    const user = await fetchAdminInfo(response.user.uid);

    dispatch(
      loginSuccess({
        userId: response.user.uid,
        userEmail: response.user.email,
        emailVerified: response.user.emailVerified,
        ...user
      })
    );

    window?.sessionStorage &&
      window.sessionStorage.setItem(
        "token",
        JSON.stringify({
          userId: response.user.uid,
          userEmail: response.user.email,
          emailVerified: response.user.emailVerified,
          ...user
        })
      );
  } catch (e) {
    console.error(e, "error");
    dispatch(loginFailure("error"));
  }
};
