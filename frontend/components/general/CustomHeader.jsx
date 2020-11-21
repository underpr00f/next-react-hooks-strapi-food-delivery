/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import Link from "next/link"
import { linksArray } from "../../constants/constants"
import { MaterialHeader } from "../../MUI/Organisms/MaterialHeader"
import { logout } from "../../lib/auth"
import CartToggle from "./../cart/CartToggle"
import { NavLink } from "../../MUI/Molecules/ButtonLink"
import { CustomizedMenus } from "../../MUI/Organisms/CustomizedMenus"

import IconButton from "@material-ui/core/IconButton"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { ThemeIndicator } from "./ThemeIndicator"

export const CustomHeader = ({ user, setUserFunc, handleLogouted }) => {
  return (
    <>
      <MaterialHeader>
        <CustomizedMenus />
        <div className="nav-desktop">
          {linksArray.map((linkElement) => (
            <NavLink
              key={linkElement.linkName}
              name={linkElement.linkName}
              hrefValue={linkElement.linkValue}
            />
          ))}
        </div>
        <div className="nav-menuLeft">
          <ThemeIndicator />
          {user ? (
            <>
              <CartToggle user={user.username} />
              <NavLink name={user.username} hrefValue="/my-donates" />
              <div className="nav-logoutButton">
                <Link href="/">
                  <a
                    className="nav-link"
                    onClick={() => {
                      logout()
                      setUserFunc(null)
                      handleLogouted()
                    }}
                  >
                    Logout
                  </a>
                </Link>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  onClick={() => {
                    logout()
                    setUserFunc(null)
                    handleLogouted()
                  }}
                >
                  <ExitToAppIcon />
                </IconButton>
              </div>
            </>
          ) : (
              <>
                <CartToggle user={null} />
                <NavLink name="Sign up" hrefValue="/signup" />
                <NavLink name="Sign in" hrefValue="/login" />
              </>
            )}
        </div>
      </MaterialHeader>
    </>
  )
}
