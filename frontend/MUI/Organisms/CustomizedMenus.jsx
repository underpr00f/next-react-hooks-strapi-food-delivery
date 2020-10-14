import React from "react";
import { linksArray } from "../../constants/constants";
import CustomLink from "../Atoms/CustomLink";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      // backgroundColor: theme.palette.secondary.light,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        // color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export const CustomizedMenus = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        edge="start"
        // className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        aria-controls="customized-menu"
        aria-haspopup="true"
        // variant="contained"
        // color="primary"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {linksArray.map((linkElement) => (
          <StyledMenuItem
            key={linkElement.linkName}
            component={CustomLink}
            href={linkElement.linkValue}
          >
            <ListItemText primary={linkElement.linkName} />
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};
