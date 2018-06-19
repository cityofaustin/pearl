import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from "react-router-dom";

import PearlRoutes from "./PearlRoutes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={this.props.client}>
        <Router>
          <PearlRoutes />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
