import React, { Component } from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { currentUserPropTypes } from '../DashboardHeader/proptypes';

import './UserSettings.css';

class UserSettings extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    const { firstName, role, department } = this.props.currentUser;

    return (
      <Dropdown
        className="coa-UserSettings"
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
      >
        <FontAwesomeIcon
          icon={faUserCircle}
          size="2x"
          className="mr-2 coa-UserSettings-avatar"
        />
        <DropdownToggle
          caret
          tag="span"
          onClick={this.toggle}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          {firstName}
        </DropdownToggle>
        <DropdownMenu right className="coa-UserSettings-dropdown-menu">
          <DropdownItem header>
            {role} -- {department}
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Profile Settings</DropdownItem>
          <DropdownItem>Logoff</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

UserSettings.propTypes = {
  currentUser: currentUserPropTypes,
};

export default UserSettings;
