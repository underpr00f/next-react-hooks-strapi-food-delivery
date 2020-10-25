import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .line": {
      backgroundColor: `${theme.palette.primary.contrastText}`
    }
  }
}));

export const LoaderContent = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div className="loaduser">
          <div className="load-3">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <style jsx>{`
          .loaduser {
            background-color: transparent;
            transform: translate(0, -7.5px);
          }

          .line {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 10px;
          }
          .load-3 .line:nth-last-child(1) {
            animation: loadingC 0.6s 0.1s linear infinite;
          }
          .load-3 .line:nth-last-child(2) {
            animation: loadingC 0.6s 0.2s linear infinite;
          }
          .load-3 .line:nth-last-child(3) {
            animation: loadingC 0.6s 0.3s linear infinite;
          }

          @keyframes loadingC {
            0 {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(0, 15px);
            }
            100% {
              transform: translate(0, 0);
            }
          }
        `}</style>
      </div>
    </>
  );
};
