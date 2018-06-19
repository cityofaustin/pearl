import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React from 'react';
import { Link } from 'react-router-dom';

const GET_SINGLE_PAGE = gql`
  query oneServicePage($id: ID) {
    allServicePages(id: $id) {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
  }
`;

const EditPage = ({
  match: {
    params: { id },
  },
}) => (
  <Query query={GET_SINGLE_PAGE} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <h1>EditPage -- {id}</h1>
          {JSON.stringify(data)}
        </div>
      );
    }}
  </Query>
);

export default EditPage;
