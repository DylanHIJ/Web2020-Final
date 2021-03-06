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
  Typography,
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
  drawerText: {
    fontFamily: `'Staatliches', cursive`,
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
            to={{
              pathname: `${match.url}${listItem.link}`,
              state: listItem.state,
            }}
            className={classes.navlink}
          >
            <ListItem button key={listItem.name}>
              <ListItemIcon>{listItem.icon}</ListItemIcon>
              <Typography
                variant="h6"
                component="h2"
                className={classes.drawerText}
              >
                {listItem.name}
              </Typography>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
}
