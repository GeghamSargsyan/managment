import React, { useState } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import SignUpForm from "./form/SignUpForm";
import BoxCenter from "./UI/box/Center";

import { isLoading } from "selectors";

const SignUp = ({ match, location }) => {
  // const history = useHistory();
  const isFetching = useSelector(isLoading);

  const [state, setState] = useState({
    didInvalidate: false
  });

  return (
    <BoxCenter>
      {console.log(
        isFetching,
        "klgfjnl++++++++++++++++++++++++++++++++++++++++"
      )}
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <SignUpForm handleSubmit={user => user} isFetching={isFetching} />
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </BoxCenter>
  );
};

SignUp.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default SignUp;
