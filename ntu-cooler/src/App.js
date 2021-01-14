import React from "react";
import "./App.css";
import Home from "./main/Home";
import Course from "./course/Course";
import { Switch, Route, Redirect } from "react-router-dom";

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses" component={Home} />
      <Route path="/courses/:id?" component={Course} />
      <Redirect from="/home" to="/" />
    </Switch>
  );
}
