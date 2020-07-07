/* eslint-disable react/no-string-refs */
import React, { useState, useCallback, memo } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CircularProgress from "@material-ui/core/CircularProgress";

const SignUpForm = ({ handleSingUp, isFetching }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: ""
  });

  const reset = useCallback(() => {
    setState({
      name: "",
      email: "",
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
    handleSingUp({ ...state }, () => reset());
  }, [handleSingUp]);

  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <TextValidator
        fullWidth
        label="name"
        onChange={handleChange}
        name="name"
        value={state.name}
        validators={["required"]}
        errorMessages={["this field is required"]}
        margin="normal"
      />
      <TextValidator
        fullWidth
        label="email"
        onChange={handleChange}
        name="email"
        value={state.email}
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
        {isFetching && <CircularProgress size={20} />} Sing Up
      </Button>
    </ValidatorForm>
  );
};

SignUpForm.propTypes = {
  handleSingUp: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  email: PropTypes.string
};

export default memo(SignUpForm);
