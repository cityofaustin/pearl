import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import PagesIndex from './components/PagesIndex';
import EditPage from './components/EditPage';

class PearlRoutes extends Component {
  render() {
    const currentUser = {
      firstName: 'Janis',
      role: 'superadmin',
      department: 'CTM',
    };

    return (
      <div className="PearlApp">
        <Route
          path="/"
          render={props => <DashboardHeader currentUser={currentUser} />}
        />
        <Switch>
          <Route path="/" exact component={PagesIndex} />
          <Route path="/edit/:id" component={EditPage} />
        </Switch>
      </div>
    );
  }
}

export default PearlRoutes;
