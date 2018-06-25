import React, { Component } from 'react';
import UserSettings from './UserSettings.js';

import './DashboardHeader.css';

class DashboardHeader extends Component {
  render() {
    return (
      <header className="container-fluid coa-DashboardHeader pt-3 pb-1">
        <div className="row">
          <div className="col">
            <h2>Pearl</h2>
          </div>
          <div className="col coa-Dashboard--right pr-5">
            <UserSettings />
          </div>
        </div>
      </header>
    );
  }
}

export default DashboardHeader;
