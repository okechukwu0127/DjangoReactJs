import React, { Component } from "react";
import { render } from "react-dom";
import AddEditNotePage from "./AddEditNotePage";

import ListNotePage from "./ListNotePage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <ListNotePage />
          </Route>
          <Route path="/add-note" component={AddEditNotePage} />
          <Route path="/edit-note/:note_id" component={AddEditNotePage} />
        </Switch>
      </Router>
    );
  }
}
