/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import { linksArray } from "../../constants/constants";
import { BottomNavItem } from "../../MUI/Atoms/BottomNavItem";
import { MaterialFooter } from "../../MUI/Molecules/MaterialFooter";

export const CustomFooter = () => {
  return (
    <>
      <MaterialFooter>
        <div className="container footer-container">
          <div className="footer-logo">
            <img
              src="https://images.unsplash.com/photo-1551150441-3f3828204ef0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              alt="footer-logo"
            />
          </div>
          <div className="footer-list">
            {linksArray.map((linkElement) => (
              <BottomNavItem
                key={linkElement.linkName}
                text={linkElement.linkName}
                value={linkElement.linkValue}
              />
            ))}
          </div>
          <div className="footer-contact">
            <ul>
              <li>Свяжитесь с нами:</li>
              <li>info@boutique.com</li>
              <li>109241, г. Москва, Котельническая наб., д. 117</li>
              <li>8 800 123 33 24</li>
            </ul>
          </div>
          <div className="footer-copyright">
            {new Date().getFullYear()} - created by underproof
          </div>
        </div>
      </MaterialFooter>
    </>
  );
};

// FooterBar.propTypes = {
//   yourUrl: PropTypes.string,
// }
