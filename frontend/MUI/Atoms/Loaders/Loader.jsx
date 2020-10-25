import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .loader": {
      border: `8px solid ${theme.palette.secondary.light}`,
      borderTop: `8px solid ${theme.palette.secondary.dark}`
    }
  }
}));
const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className="loader">
        <style jsx>
          {`
            .loader {
              // border: 8px solid #f3f3f3; /* Light grey */
              // border-top: 8px solid #3498db; /* Blue */
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 2s linear infinite;
              margin-left: auto;
              margin-right: auto;
              margin-top: 40px;
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 99;
            }
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Loader;
