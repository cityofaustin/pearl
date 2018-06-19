import gql from "graphql-tag";
import { Query } from "react-apollo";
import React from "react";
import { Link } from "react-router-dom";

const GET_SINGLE_PAGE = gql`
  query getSingleServicePage($pageSlug: String) {
    servicePage(slug: $pageSlug, pk: 5) {
      id
      slug
      title
      image {
        id
      }
    }
  }
`;

const EditPage = ({
  match: {
    params: { pageSlug }
  }
}) => (
  <Query query={GET_SINGLE_PAGE} variable={{ pageSlug }}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <h1>EditPage -- {pageSlug}</h1>
          {JSON.stringify(data)}
        </div>
      );
    }}
  </Query>
);

export default EditPage;
