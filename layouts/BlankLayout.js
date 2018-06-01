import { string } from 'prop-types'

import Link from 'next/link'
import Head from '../components/Head'


const BlankLayout = (props) => (
  <div>
    <Head title={props.title} />

    { props.children }

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
    `}</style>
    <style global jsx>{`
      html, body, #__next { height: 100%; }
      a {
        color: #333;
      }
    `}</style>
  </div>
)

BlankLayout.propTypes = {
  title: string,
}

export default BlankLayout
