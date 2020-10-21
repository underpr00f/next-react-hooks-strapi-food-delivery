import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import Switch from "@material-ui/core/Switch";

export const ThemeIndicator = () => {
  const { isDark, setTheme } = useContext(AppContext);

  const [state, setState] = useState(isDark);

  const handleChange = (state) => {
    setState(!state);
    setTheme(!state);
  };
  return (
    <Switch
      checked={state}
      onChange={() => handleChange(state)}
      color="default"
      name="checked"
      inputProps={{ "aria-label": "primary checkbox" }}
    />
  );
};
