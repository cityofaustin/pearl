import { string } from 'prop-types'

import Link from 'next/link'
import Head from '../components/Head'
import Header from '../components/Header'
import Nav from '../components/Nav'


const AppLayout = (props) => (
  <div>
    <Head title={props.title} />

    <Header />
    <app>
      <content>
        { props.children }
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
  </div>
)

AppLayout.propTypes = {
  title: string,
}

export default AppLayout
