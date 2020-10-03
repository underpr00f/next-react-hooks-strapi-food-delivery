import React from "react";

export const LoaderContent = () => (
  <>
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
      }

      .line {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        margin-bottom: 15px;
        background-color: #ccc;
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
  </>
);
