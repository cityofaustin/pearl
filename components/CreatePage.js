import React from 'react';
import Modal from 'react-responsive-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListOl } from '@fortawesome/free-solid-svg-icons'
import { faCalendar, faIdCard, faNewspaper } from '@fortawesome/free-regular-svg-icons'

import axios from '../plugins/axios'
import {Router} from '../plugins/routes'

const MAX_TITLE_CHARS = 55;
const SELECTABLE_THEMES = ['Housing & Utilities', 'Government & Business'];


export default class CreatePage extends React.Component {
  constructor(props) {
    super(props);

    const selectableThemes = []
    props.themes.forEach(theme => {
      if (SELECTABLE_THEMES.includes(theme.text)) {
        selectableThemes.push(theme);
      }
    })

    this.state = {
      pageTypes: [
        {name: 'Event', icon: faCalendar, description: 'Events are added to your department page automatically.'},
        {name: 'Service', icon: faListOl, description: 'A step-by-step guide to a particular city service.'},
        {name: 'Department', icon: faIdCard, description: 'Basic information about a department, including contact information.'},
        {name: 'News Release', icon: faNewspaper, description: 'News releases are time-boxed and are archived after they expire.'},
      ],
      selectableThemes: selectableThemes,
      activePage: 0,
      selectedPageType: '',
      selectedTitle: '',
      titleCharsRemaining: MAX_TITLE_CHARS,
      selectedTopic: '',
    }

    this.onPrevious = this.onPrevious.bind(this);
    this.onSelectPageType = this.onSelectPageType.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onSaveTitle = this.onSaveTitle.bind(this);
    this.onCreatePage = this.onCreatePage.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({activePage: 0, selectedPageType: '', selectedTitle: '', selectedTopic: '', titleCharsRemaining: MAX_TITLE_CHARS});
  }

  onPrevious() {
    const {activePage} = this.state;
    this.setState({activePage: activePage - 1});
  }

  onSelectPageType(pageType) {
    const {activePage} = this.state;
    this.setState({selectedPageType: pageType.name, activePage: activePage + 1});
  }

  onTitleChange(e) {
    const title = e.target.value;
    this.setState({selectedTitle: title, titleCharsRemaining: MAX_TITLE_CHARS - title.length});
  }

  onSaveTitle() {
    const {activePage} = this.state;
    this.setState({activePage: activePage + 1});
  }

  onSelectTopic(topic) {
    this.setState({selectedTopic: topic.text})
  }

  async onCreatePage() {
    const {selectedPageType, selectedTitle, selectedTopic} = this.state;
    const resp = await this.createPage(selectedPageType, selectedTitle, selectedTopic);
    console.log(resp);
    if (resp.status !== 200) {
      throw new Error('Request failed');
    }
    else if (resp.data && resp.data.errors) {
      throw new Error(resp.data.errors[0]);
    }
    else if (resp.data && resp.data.data) {
      Router.pushRoute('editPage', {id: resp.data.data.createPage.page.id})
      this.props.onClose();
    }
    else {
      console.error('Unknown response');
      throw new Error('Unknown response');
    }
  }

  async createPage(type, title, topic) {
    console.log(`Creating ${type} page "${title}" in ${topic}...`);
    const query = `
      mutation createPage($pageType:PageType!, $title:String!, $topic:String!) {
        createPage(pageType:$pageType, title:$title, topic:$topic) {
          page {
            id
            title
          }
        }
      }`;
    const d = {
      query: query,
      variables: {
        pageType: type.toUpperCase().replace(/\s+/g, '_'),
        title: title,
        topic: topic,
      },
    };

    return axios.post('', d);
  }

  renderPageTypeSelector() {
    return (
      <div>
        <h1>Select the content type</h1>

        <div className="container">
          {this.state.pageTypes.map((pageType, i) => {
            return (
              <button key={i} onClick={this.onSelectPageType.bind(this, pageType)}>
                <div className="card-body">
                  <span className="embiggen">
                    <FontAwesomeIcon icon={pageType.icon} className="embiggen" />
                  </span>
                  <h3 className="text-center card-title">{ pageType.name }</h3>
                  <p className="card-text">{ pageType.description }</p>
                </div>
              </button>
            )
          })}
        </div>

        <style jsx>{`
          .container {
            display: flex;
          }

          button {
            background-color: #fff;
            border: 1px solid rgba(0,0,0,.125);
            border-radius: .25rem;
            padding: 0.6rem;
            margin: 0.6rem;
          }

          button:hover {
            box-shadow: 3px 3px 8px #666;
          }

          .embiggen {
            font-size: 5rem;
          }
        `}</style>
      </div>
    );
  }

  renderTitleInput() {
    const {selectedTitle, titleCharsRemaining} = this.state;

    return (
      <div>
        <h1>Write an actionable title for your service page</h1>
        <h3>It should start with a verb!</h3>

        <form>
          <div className="form-group">
            <label htmlFor="pageTitleInput">Page Title</label>
            <input value={selectedTitle} onChange={this.onTitleChange} aria-describedby="pageTitleHelp" placeholder="" autoFocus />
            <small id="pageTitleHelp" className="form-text text-muted">Example: Drop off household hazardous waste and other recyclables</small>
            <small className="form-text text-muted">Psst! You can use up to {titleCharsRemaining} more characters</small>
          </div>
        </form>

        <ul>
          <li>Use simple, accessible language</li>
          <li>Use words you think residents may search to find the service</li>
          <li>You don’t need to worry about including your department’s name in the title</li>
          <li>
            <a href="https://cityofaustin.github.io/digital-services-style-guide/speak-to-the-people-not-over-them/">See more in the Style Guide</a>
          </li>
        </ul>

        <div className="button-group">
          <button onClick={this.onPrevious}>Previous</button>
          <button onClick={this.onSaveTitle}>Next</button>
        </div>

        <style jsx>{`
          .button-group {
            display: flex;
          }
        `}</style>
      </div>
    )
  }

  renderTopics(topics) {
    const {selectedTopic} = this.state;
    return (
      <ul>
        {topics.map((topic, i) => {
          return (
            <li key={i}>
              <button className={topic.text === selectedTopic ? 'active': ''} onClick={this.onSelectTopic.bind(this, topic)}>{ topic.text }</button>
            </li>
          )
        })}

        <style jsx>{`
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          li {
            margin: 0.2rem;
          }

          button {
            width: 100%;
            background-color: #fff;
            border: 1px solid rgba(0,0,0,.125);
            border-radius: .25rem;
            padding: 0.4rem;
            margin: 0.2rem;
            text-align: left;
          }

          button:hover {
            background-color: #f8f9fa;
          }

          button.active {
            background-color: #007bff;
            border-color: #007bff;
          }
        `}</style>
      </ul>
    )
  }

  renderTopicSelector() {
    const {selectableThemes} = this.state;

    return (
      <div>
        <h1>Please select the topic that best fits</h1>

        <div className="card-deck">
          {selectableThemes.map((theme, i) => {
            return (
              <div className="card" key={i}>
                <div className="card-body">
                  <h3 className="text-center card-title">{ theme.text }</h3>
                  <div className="card-text">
                    {this.renderTopics(theme.topics)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="button-group">
          <button onClick={this.onPrevious}>Previous</button>
          <button onClick={this.onCreatePage}>Create Page</button>
        </div>

        <style jsx>{`
          .card-deck {
            display: flex;
          }

          .card {
            margin: 1rem;
            padding: 1rem;
            border: 1px solid lightgrey;
          }

          h3 {
            text-align: center;
          }
        `}</style>
      </div>
    )
  }

  render() {
    const { activePage, pageTypes } = this.state;

    return (
      <Modal open={this.props.open} onClose={this.props.onClose} center>
        {activePage === 0 && this.renderPageTypeSelector()}
        {activePage === 1 && this.renderTitleInput()}
        {activePage === 2 && this.renderTopicSelector()}
      </Modal>
    );
  }
}
