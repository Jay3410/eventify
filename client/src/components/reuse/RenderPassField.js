import React from "react";
import {
  TextField,
  FormHelperText,
  InputAdornment,
  IconButton
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default ({ input, label, meta: { touched, error } }) => {
  const [showPass, setShowPass] = React.useState(false);
  const handleClickShowPassword = () => setShowPass(!showPass);
  return (
    <React.Fragment>
      <TextField
        {...input}
        id="outlined-adornment-password"
        required
        variant="outlined"
        type={showPass ? "text" : "password"}
        label={label}
        fullWidth
        error={error && true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label="Toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPass ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {touched && error && <FormHelperText error>{error}</FormHelperText>}
    </React.Fragment>
  );
};
