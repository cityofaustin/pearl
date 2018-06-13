import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React from 'react';

const GET_PAGES = gql`
  {
    allServicePages {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

const Pages = () => (
  <Query query={GET_PAGES}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return data.allServicePages.edges.map(edge => (
        <div key={edge.node.id} value={edge.node.title}>
          {edge.node.title}
        </div>
      ));
    }}
  </Query>
);

export default Pages;
