import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import VideoDashboard from "./components/video-dashboard";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Login />
      </Route>
      <Route exact path="/">
        <VideoDashboard />
      </Route>
      <Route path="*">
        <Login />
      </Route>
    </Switch>
  </Router>
);

export default App;
