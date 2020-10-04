import React from "react";

export const ToastMessage = (name, action) => {
  return (
    <>
      <div>
        <b>{name}</b>{" "}
        {action === "add"
          ? "add to cart"
          : action === "remove"
          ? "removed from cart"
          : null}
      </div>
    </>
  );
};
