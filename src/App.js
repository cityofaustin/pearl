import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";

import Pages from "./components/Pages";
import "./App.css";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={this.props.client}>
        <div className="App">
          <h2>OUR  first deployed Apollo app 🚀</h2>
          <Pages />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
