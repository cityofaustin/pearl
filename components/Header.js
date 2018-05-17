import { string } from 'prop-types'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import Logo from '../components/Logo'


const Header = (props) => (
  <header>
    <ul>
      <li>
        <Link prefetch href="/">
          <Logo />
        </Link>
      </li>
      <ul>
        <li>
          <Link href="/logout">
            <a aria-expanded="false">
              { !props.profileImageURL && <FontAwesomeIcon icon={faUserCircle} size="2x" /> }
              { props.profileImageURL && <img src={props.profileImageURL} width="40" height="40" /> }
            </a>
          </Link>
        </li>
      </ul>
    </ul>

    <style jsx>{`
      header {
        text-align: center;
        box-shadow: inset 0 -1px 0 rgba(0,0,0,.1);
        padding: 1rem;
      }

      ul {
        display: flex;
        justify-content: space-between;
        list-style: none;
        margin: 0;
        padding: 0;
      }
    `}</style>
  </header>
)

Header.propTypes = {
  profileImageURL: string,
}


Header.defaultProps = {
  // profileImageURL: 'http://0.gravatar.com/avatar/bca98d4d3087d669f5317e2c73f54e45?s=2048',
  profileImageURL: null,
}

export default Header
