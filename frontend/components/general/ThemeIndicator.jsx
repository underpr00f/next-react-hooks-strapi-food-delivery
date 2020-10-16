import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";
import Switch from "@material-ui/core/Switch";

export const ThemeIndicator = () => {
  const { isDark, setTheme } = useContext(AppContext);

  const [state, setState] = useState({
    checked: isDark
  });
  useEffect(() => {
    if (isDark) setState({ checked: isDark });
  }, [isDark]);

  const handleChange = (event) => {
    setTheme(event.target.checked);
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <Switch
      checked={state.checked}
      onChange={handleChange}
      color="default"
      name="checked"
      inputProps={{ "aria-label": "primary checkbox" }}
    />
  );
};
