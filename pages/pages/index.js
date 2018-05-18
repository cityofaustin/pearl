import React from 'react';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-regular-svg-icons'

import axios from '../../plugins/axios'
import { Link } from '../../plugins/routes'
import AppLayout from '../../components/AppLayout'
import CreatePage from '../../components/CreatePage'


export default class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({open: true});
  }

  closeModal() {
    this.setState({open: false});
  }

  render() {
    const { open } = this.state;

    return (
      <AppLayout title="Pages">
          <div className="row">
            <h1>Pages</h1>
            <div className="group">
              <button onClick={this.openModal}>
                <span className="icon">
                  <FontAwesomeIcon icon={faFile} />
                </span>
                Create New Content
              </button>
              <input placeholder="Search" aria-label="Search" type="text" />
            </div>
          </div>

          <CreatePage open={open} onClose={this.closeModal} themes={this.props.themes} />

          <table>
            <thead>
              <tr>
                <td>Title</td>
                <td>Updated</td>
                <td>Type</td>
                <td>Author</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {this.props.pages.map((page, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <Link href="editPage" params={{id: page.id}}>
                        <a>
                          {page.title}
                        </a>
                      </Link>
                    </td>
                    <td>{page.lastUpdated}</td>
                    <td>{page.pageType}</td>
                    <td>{page.author || 'JonesR'}</td>
                    <td>{ page.hasUnpublishedChanges ? 'In Progress' : 'Published' }</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

        <style jsx>{`
          .row {
            padding-bottom: 1rem;
            display: flex;
            justify-content: space-between;
          }

          .group > :first-child {
            margin-right: 0.5rem;
          }

          .icon {
            width: 16px;
            margin-right: 0.5rem;
          }

          button {
            border-radius: 0.2rem;
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
            border: 1px solid transparent;
            padding: 0.35rem 0.6rem;
            line-height: 1.5rem;
            font-size: 0.875rem;
            cursor: pointer;
            transition: background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
          }

          button:hover {
            background-color: #0069d9;
            border-color: #0062cc;
          }

          table {
            width: 100%;
          }

          table thead td {
            border-bottom: 2px solid #dee2e6;
            font-weight: bold;
          }

          table td {
            border-top: 1px solid #dee2e6;
            padding: .3rem;
          }

          table tbody tr:nth-of-type(2n+1) {
            background-color: rgba(0,0,0,.05);
          }
        `}</style>
      </AppLayout>
    )
  }
}

const WEF = `
{
  allPages: allServicePages {
    edges {
      node {
        id
        title
        hasUnpublishedChanges
        latestRevisionCreatedAt
      }
    }
  }
  allThemes: allThemes {
    edges {
      node {
        id
        text
        description
        topics {
          edges {
            node {
              id
              text
              description
            }
          }
        }
      }
    }
  }
}`;

Page.getInitialProps = async () => {
  const d = {
    query: WEF,
    variables: null,
  };
  const {data: resp} = await axios.post('/', d);

  const pages = [];
  resp.data.allPages.edges.forEach((n) => {
    const page = Object.assign({}, n.node);
    if (page.latestRevisionCreatedAt) {
      page.lastUpdated = moment(page.latestRevisionCreatedAt).fromNow();
      pages.push(page);
    }
  });

  const themes = resp.data.allThemes.edges.map((n) => {
    const theme = Object.assign({}, n.node);
    theme.topics = theme.topics.edges.map((n) => Object.assign({}, n.node));
    return theme;
  });

  return {pages, themes};
}
