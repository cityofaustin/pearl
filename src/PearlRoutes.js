import React, { Component } from "react";
import PagesIndex from "./components/PagesIndex";
import EditPage from "./components/EditPage";
import { Route, Redirect, Switch } from "react-router-dom";

class PearlRoutes extends Component {
  render() {
    return (
      <div className="PearlApp">
        <Switch>
          <Route path="/" exact component={PagesIndex} />
          <Route path="/edit/:pageSlug" component={EditPage} />
        </Switch>
      </div>
    );
  }
}

export default PearlRoutes;
