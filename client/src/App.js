import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";

const App = () => (
  <div className="container">
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <h1>Sensitive Page</h1>
        </Route>
        <Route path="*">
          <Login />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
