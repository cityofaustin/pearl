import React from 'react'

import { logout } from '../plugins/auth0'

export default class SignOff extends React.Component {
  componentDidMount () {
    logout()
  }
  render () {
    return null
  }
}
