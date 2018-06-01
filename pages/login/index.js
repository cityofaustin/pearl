import React from 'react'

import BlankLayout from '../../layouts/BlankLayout'
import { show } from '../../plugins/auth0'

const CONTAINER_ID = 'put-lock-here'

export default class Login extends React.Component {
  componentDidMount () {
    show(CONTAINER_ID)
  }

  render () {
    return (
      <BlankLayout title="login">
        <div id={CONTAINER_ID} />
      </BlankLayout>
    );
  }
}
