import gql from "graphql-tag";
import { Query } from "react-apollo";
import React from "react";
import { Link } from "react-router-dom";

const GET_PAGES = gql`
  {
    allServicePages {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`;

const PagesIndex = () => (
  <Query query={GET_PAGES}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return data.allServicePages.edges.map(edge => (
        <div key={edge.node.id} value={edge.node.title}>
          <Link to={`/edit/${edge.node.id}`}>{edge.node.title}</Link>
        </div>
      ));
    }}
  </Query>
);

export default PagesIndex;
