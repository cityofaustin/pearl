import { string } from 'prop-types'
import Link from 'next/link'

import BlankLayout from './BlankLayout'
import Header from '../components/Header'
import {getUser} from '../plugins/auth0'
import Nav from "../components/nav";


export const AppLayout = (props) => {
  const {children, title, user} = props;

  return (
    <BlankLayout title={title}>

      <Header displayName={user && user.nickname} profileImageURL={user && user.picture} />
      <app>
        <content>
          { children }
        </content>
        <sidebar>
          <Nav />
        </sidebar>
      </app>

      <style jsx>{`
        height: 100%;

        app {
          display: flex;
          height: 100%;
        }
        content {
          order: 1;
          flex-grow: 100;
          padding: 1rem;
        }
        sidebar {
          background-color: rgb(248, 249, 250);
          box-shadow: inset -1px 0 0 rgba(0,0,0,.1);
          flex-basis: 15%;
          padding: 0.5rem 0.2rem;
        }
      `}</style>
      <style global jsx>{`
        html, body, #__next { height: 100%; }
        a {
          color: #333;
        }
      `}</style>
    </BlankLayout>
  )
}

export const withAppLayout = (Page, title) => {
  const WithAppLayout = props => <AppLayout title={title || props.title} {...props}><Page {...props} /></AppLayout>

  WithAppLayout.displayName = `WithAppLayout(${Page.displayName || Page.name || 'Unknown'})`

  WithAppLayout.getInitialProps = async context => {
    const user = getUser(context);
    console.log(`Current user=${JSON.stringify(user)}`)
    const pageProps = Page.getInitialProps ? await Page.getInitialProps(context) : {};

    return {
      ...pageProps,
      user,
    }
  }

  return WithAppLayout
}

export default AppLayout;
