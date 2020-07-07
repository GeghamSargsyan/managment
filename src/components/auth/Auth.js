import React, { useEffect } from "react";
import { Route } from "react-router";
import { withRouter, useHistory } from "react-router-dom";
// import PrivateRoute from "./auth/core/PrivateRoute";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

// import Logout from "./auth/Logout";
// import Dashboard from "views/Dashboard";
const Auth = () => {
  const history = useHistory();

  useEffect(() => {
    const isGuest = window.sessionStorage.getItem("token");
    JSON.parse(isGuest)?.userId && history.push("/admin");
  }, [history]);
  return (
    <>
      <Route exact path="/login" render={props => <SignIn {...props} />} />
      <Route exact path="/signup" render={props => <SignUp {...props} />} />
    </>
  );
};

export default withRouter(Auth);
