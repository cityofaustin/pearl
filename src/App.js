import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";

import Pages from "./Pages";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={this.props.client}>
        <div>
          <h2>My first Apollo app 🚀</h2>
          <Pages />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
