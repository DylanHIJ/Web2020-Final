import Cookies from "js-cookie";
import React, { useState } from "react";
import "./App.css";
import Login from "./login/Login";
import Home from "./main/Home";
import Course from "./course/Course";
import Account from "./account/Account";
import { Switch, Route, Redirect } from "react-router-dom";

export default function App() {
  return Cookies.get("token") ? (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses" component={Home} />
      <Route exact path="/account" component={Account} />
      <Route path="/courses/:id?" component={Course} />
      <Redirect from="/home" to="/" />
    </Switch>
  ) : (
    <Login />
  );
}
