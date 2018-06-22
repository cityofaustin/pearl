import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PagesIndex from './components/PagesIndex';
import EditPage from './components/EditPage';

class PearlRoutes extends Component {
  render() {
    return (
      <div className="PearlApp">
        <Switch>
          <Route path="/" exact component={PagesIndex} />
          <Route path="/edit/:id" component={EditPage} />
        </Switch>
      </div>
    );
  }
}

export default PearlRoutes;
