import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import LockIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import { loginAction } from "store/thunks";
import { isLoading, getUserInfo } from "selectors";

import SignInForm from "./form/SignInForm";
import BoxCenter from "./UI/box/Center";

const SignIn = ({ auth, match, location }) => {
  const isFetching = useSelector(isLoading);
  const user = useSelector(getUserInfo);
  const history = useHistory();

  useEffect(() => {
    if (!user?.userId) return;
    history.push("/admin");
  }, [user, history]);

  const [state, setState] = useState({
    didInvalidate: false
  });

  const dispatch = useDispatch();

  const login = useCallback(
    (email, password) => {
      dispatch(loginAction(email, password));
      // "user@example.com", "123456789"
    },
    [dispatch, loginAction]
  );
  return (
    <BoxCenter>
      <Avatar>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <SignInForm handleLogin={login} isFetching={isFetching} />
      <p>
        Need an account? <Link to="/signup">Sign up</Link>
      </p>
    </BoxCenter>
  );
};

SignIn.propTypes = {
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default SignIn;
