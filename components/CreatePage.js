import React from 'react';
import Modal from 'react-responsive-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListOl } from '@fortawesome/free-solid-svg-icons'
import { faCalendar, faIdCard, faNewspaper } from '@fortawesome/free-regular-svg-icons'

const MAX_TITLE_CHARS = 55;


export default class CreatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 0,
      pageTypes: [
        {name: 'Event', icon: faCalendar, description: 'Events are added to your department page automatically.'},
        {name: 'Service', icon: faListOl, description: 'A step-by-step guide to a particular city service.'},
        {name: 'Department', icon: faIdCard, description: 'Basic information about a department, including contact information.'},
        {name: 'News Release', icon: faNewspaper, description: 'News releases are time-boxed and are archived after they expire.'},
      ],
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
    this.setState({activePage: 0});
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

  onCreatePage() {
    this.props.onClose();
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
                  <FontAwesomeIcon icon={pageType.icon} />
                  <h5 className="text-center card-title">{ pageType.name }</h5>
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
            <input value={selectedTitle} onChange={this.onTitleChange} aria-describedby="pageTitleHelp" placeholder="" />
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

  renderTopicSelector() {
    return (
      <div>
        <h1>Please select the topic that best fits</h1>

        <div className="button-group">
          <button onClick={this.onPrevious}>Previous</button>
          <button onClick={this.onCreatePage}>Create Page</button>
        </div>
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
