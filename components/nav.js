import { string } from 'prop-types'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { faFile, faChartBar } from '@fortawesome/free-regular-svg-icons'


const Nav = (props) => (
    <ul>
      <li>
        <Link href="/">
          <a>
            <span className="icon">
              <FontAwesomeIcon icon={faTachometerAlt} />
            </span>
            Dashboard
          </a>
        </Link>
      </li>
      <li>
        <Link href="/pages">
          <a>
            <span className="icon">
              <FontAwesomeIcon icon={faFile} />
            </span>
            Pages
          </a>
        </Link>
      </li>
      <li>
        <Link href="/performance">
          <a>
            <span className="icon">
              <FontAwesomeIcon icon={faChartBar} />
            </span>
            Performance
          </a>
        </Link>
      </li>

    <style jsx>{`
      ul {
        list-style: none;
        padding: 0 0;
        margin: 0 1rem;
      }

      li {
        padding: 0.5rem 0;
      }

      .icon {
        width: 16px;
        margin-right: 0.5rem;
      }
    `}</style>
  </ul>
)

// Nav.propTypes = {
//   title: string,
// }

export default Nav
