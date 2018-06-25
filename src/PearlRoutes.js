import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import PagesIndex from './components/PagesIndex';
import EditPage from './components/EditPage';

class PearlRoutes extends Component {
  render() {
    return (
      <div className="PearlApp">
        <Route path="/" component={DashboardHeader} />
        <Switch>
          <Route path="/" exact component={PagesIndex} />
          <Route path="/edit/:id" component={EditPage} />
        </Switch>
      </div>
    );
  }
}

export default PearlRoutes;
