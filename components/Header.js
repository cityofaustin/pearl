import { string } from 'prop-types'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import Logo from '../components/Logo'


const Header = (props) => {
  const {displayName, profileImageURL} = props;

  return (
    <header>
      <ul>
        <li>
          <Link prefetch href="/">
            <Logo />
          </Link>
        </li>
        <ul>
          <li>
            { !profileImageURL && <Link href="/login"><a><FontAwesomeIcon icon={faSignInAlt} size="2x" /></a></Link> }
            { profileImageURL && <img src={profileImageURL} width="40" height="40" alt={`Hello ${displayName}`} /> }
          </li>
          { displayName && <li>
              <Link href="/logout"><a><FontAwesomeIcon icon={faSignOutAlt} size="lg" /></a></Link>
          </li> }
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
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          padding: 0 0.5rem;
        }
      `}</style>
    </header>
  )
}

Header.propTypes = {
  displayName: string,
  profileImageURL: string,
}


Header.defaultProps = {
  displayName: null,
  profileImageURL: null,
}

export default Header
