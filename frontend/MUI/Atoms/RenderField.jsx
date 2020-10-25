import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   "@global": {
//     "form label": {
//       color: "#000"
//     }
//   }
// }));
// MuiOutlinedInput-input
export const RenderField = ({
  validationType,
  nameType,
  shortName,
  typeField,
  focusField,
  errors
}) => {
  // const classes = useStyles();
  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label={`Enter ${shortName}`}
        name={nameType}
        type={typeField || "text"}
        autoComplete={shortName}
        autoFocus={focusField || false}
        inputRef={validationType}
        error={!!errors[nameType]}
        helperText={(() => {
          if (errors[nameType]) {
            if (errors[nameType].type === "required") {
              return "This field is required";
            }
            if (errors[nameType].type === "minLength") {
              return "This field must have more than 3 characters";
            }
            if (errors[nameType].type === "validate") {
              return "Invalid email address";
            }
          }
          return "";
        })()}
      />
    </>
  );
};

RenderField.propTypes = {
  validationType: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  nameType: PropTypes.string,
  typeField: PropTypes.string,
  focusField: PropTypes.bool,
  shortName: PropTypes.string,
  errors: PropTypes.object
};
