/* eslint-disable react/no-string-refs */
import React, { memo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CircularProgress from "@material-ui/core/CircularProgress";

const SignInForm = ({ handleLogin, isFetching, username }) => {
  const [state, setState] = useState({
    username: username || "",
    password: ""
  });

  const reset = useCallback(() => {
    setState({
      username: "",
      password: ""
    });
  }, [state]);

  const handleChange = useCallback(
    event => {
      if (!event?.target) return;

      const value = event.target.value;
      const field = event.target.name;

      setState(prevState => ({ ...prevState, [field]: value }));
    },
    [state]
  );

  const handleSubmit = useCallback(() => {
    handleLogin(state.username, state.password);
  }, [handleLogin, state]);

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <TextValidator
        fullWidth
        label="Username"
        onChange={handleChange}
        name="username"
        value={state.username}
        validators={["required"]}
        errorMessages={["this field is required"]}
        margin="normal"
      />
      <TextValidator
        fullWidth
        label="Password"
        type="password"
        onChange={handleChange}
        name="password"
        value={state.password}
        validators={["required"]}
        errorMessages={["this field is required"]}
        margin="normal"
      />
      <Button
        variant="contained"
        fullWidth
        color="primary"
        type="submit"
        disabled={isFetching}
        margin="normal"
      >
        {isFetching && <CircularProgress size={20} />} Sing In
      </Button>
    </ValidatorForm>
  );
};

SignInForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  username: PropTypes.string
};

export default memo(SignInForm);
