import Cookies from "js-cookie";
import React, { useState } from "react";
import "./App.css";
import Login from "./account/Login";
import SignUp from "./account/SignUp";
import Home from "./main/Home";
import Course from "./course/Course";
import Account from "./account/Account";
import { Switch, Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { CHECK_TOKEN } from "./graphql";
import Loading from "./components/Loading";

export default function App() {
  const [login, setLogin] = useState(true);
  const { loading, data } = useQuery(CHECK_TOKEN, {
    variables: { token: Cookies.get("token") },
  });
  if (loading) return <Loading />;

  if (Cookies.get("token") && data.user === null) {
    return login ? (
      <Login setLogin={setLogin} />
    ) : (
      <SignUp setLogin={setLogin} />
    );
  }

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
