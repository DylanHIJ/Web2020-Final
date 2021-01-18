import Cookies from "js-cookie";
import React, { useState } from "react";
import "./App.css";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import Home from "./main/Home";
import Course from "./course/Course";
import Account from "./account/Account";
import { Switch, Route, Redirect } from "react-router-dom";

export default function App() {
  const [login, setLogin] = useState(true);
  return Cookies.get("token") ? (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses" component={Home} />
      <Route exact path="/account" component={Account} />
      <Route path="/courses/:cid?" component={Course} />
      <Redirect from="/home" to="/" />
    </Switch>
  ) : login ? (
    <Login setLogin={setLogin} />
  ) : (
    <SignUp setLogin={setLogin} />
  );
}
