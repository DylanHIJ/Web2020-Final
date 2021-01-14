import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  navlink: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function LeftDrawer(props) {
  const { drawerList, open, setOpen, match } = props;
  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {drawerList.map((listItem, index) => (
          <NavLink
            key={listItem.name}
            to={`${match.url}${listItem.link}`}
            className={classes.navlink}
          >
            <ListItem button key={listItem.name}>
              <ListItemIcon>{listItem.icon}</ListItemIcon>
              <ListItemText primary={listItem.name} />
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
}
