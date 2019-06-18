import React from "react";
import { TextField, FormHelperText } from "@material-ui/core";

export default ({
  input,
  required = true,
  label,
  autoFocus = false,
  meta: { touched, error },
  type = "text"
}) => (
  <React.Fragment>
    <TextField
      {...input}
      variant="outlined"
      required={required}
      fullWidth
      error={error && true}
      label={label}
      autoFocus={autoFocus}
      type={type}
    />
    {touched && error && <FormHelperText error>{error}</FormHelperText>}
  </React.Fragment>
);
