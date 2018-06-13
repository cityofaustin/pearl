import React from 'react'
import queryString from 'query-string'

import BlankLayout from '../../layouts/BlankLayout'
import {login} from '../../plugins/auth0'
import {Router} from '../../plugins/routes'

export default class LoginSuccess extends React.Component {
  componentDidMount() {
    const parsed = Object.assign({}, queryString.parse(location.search), queryString.parse(location.hash));

    try {
      login(parsed);
      Router.push('/')
    }
    catch(e) {
      Router.push(`/login?next=${window.location.pathname}`);
    }
  }

  render() {
    return <BlankLayout title="success" />;
  }
}
