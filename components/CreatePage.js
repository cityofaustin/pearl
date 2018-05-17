import React from 'react';
import Modal from 'react-responsive-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListOl } from '@fortawesome/free-solid-svg-icons'
import { faCalendar, faIdCard, faNewspaper } from '@fortawesome/free-regular-svg-icons'


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
    }
  }

  renderPageTypeSelector() {
    return (
      <div>
        <h1>Select the content type</h1>

        <div className="container">
          {this.state.pageTypes.map((pageType, i) => {
            return (
              <button key={i}>
                <div class="card-body">
                  <FontAwesomeIcon icon={pageType.icon} />
                  <h5 class="text-center card-title">{ pageType.name }</h5>
                  <p class="card-text">{ pageType.description }</p>
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
    const titleCharsRemaining = 55;

    return (
      <div>
        <h1>Write an actionable title for your service page</h1>
        <h3>It should start with a verb!</h3>

        <form>
          <div class="form-group">
            <label for="pageTitleInput">Page Title</label>
            <input class="form-control" v-model="title" id="pageTitleInput" aria-describedby="pageTitleHelp" placeholder="" />
            <small id="pageTitleHelp" class="form-text text-muted">Example: Drop off household hazardous waste and other recyclables</small>
            <small class="form-text text-muted">Psst! You can use up to { titleCharsRemaining } more characters</small>
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

        <style jsx>{`
        `}</style>
      </div>
    )
  }

  renderTopicSelector() {
    return (
      <div>
        <h1>Please select the topic that best fits</h1>
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
