import React from 'react';
import TextField from '@material-ui/core/TextField';
// import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

export const ControllerField = ({
  control,
  messageNew,
  validationTypeObj,
  nameType,
  shortName,
  typeField,
  focusField,
  errors
}) => {
  // const classes = useStyles();
  return (
    <>
      <Controller
        as={<TextField />}
        defaultValue={messageNew || ''}
        name={nameType}
        type={typeField || 'text'}
        autoComplete={shortName}
        label={`Enter ${shortName}`}
        control={control}
        value={messageNew}
        error={!!errors[nameType]}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        autoFocus={focusField || false}
        onChange={([event]) => {
          return event.target.value;
        }}
        rules={validationTypeObj}
        helperText={(() => {
          if (errors[nameType]) {
            if (errors[nameType].type === 'required') {
              return 'This field is required';
            }
            if (errors[nameType].type === 'minLength') {
              return 'This field must have more than 3 characters';
            }
            if (errors[nameType].type === 'validate') {
              return 'Invalid email address';
            }
          }
          return '';
        })()}
      />
    </>
  );
};

// RenderField.propTypes = {
//   validationType: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.shape({ current: PropTypes.any })
//   ]),
//   nameType: PropTypes.string,
//   typeField: PropTypes.string,
//   focusField: PropTypes.bool,
//   shortName: PropTypes.string,
//   errors: PropTypes.object
// };
