import React, { Component } from 'react';
import UserSettings from './UserSettings.js';
import PropTypes from 'prop-types';

import './DashboardHeader.css';

const DashboardHeader = ({ currentUser }) => (
  <header className="container-fluid coa-DashboardHeader pt-3 pb-1">
    <div className="row">
      <div className="col">
        <h2>Pearl</h2>
      </div>
      <div className="col coa-Dashboard--right pr-5">
        <UserSettings currentUser={currentUser} />
      </div>
    </div>
  </header>
);

DashboardHeader.propTypes = {
  currentUser: PropTypes.object,
};

export default DashboardHeader;
