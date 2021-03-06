import React, { Component } from "react";
import Link from 'next/link'
import Form from "react-jsonschema-form";

import axios from '../../plugins/axios';
import {withAppLayout} from '../../layouts/AppLayout';


const schema = {
  "type": "object",
  "title": "Edit Service Page",
  "properties": {
    "title": {
        "type": "string",
        "minLength": 4,
        "maxLength": 80,
        "title": "Actionable Title",
    },
    "steps": {
      "type": "array",
      "title": "Write out the steps a resident needs to take to use the service",
      "minItems": 1,
      "items": {
        "type": "string"
      }
    },
    "additionalContent": {
      "type": "string",
      "description": "Section header: What else do I need to know?",
      "title": "Write any additional content describing the service.",
      "maxLength": 5000,
      "attrs": {
          "type": "textarea",
          "placeholder": "Additional Content",
          "title": "Write any additional content describing the service."
      }
    },
    dynamicContent: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: true,
        properties: {
        }
      }
    },
    "searchDescription": {
      "type": "string",
      "title": "Write a description for this page which will be used for Search Engines.",
      "attrs": {
        "placeholder": "",
        "title": "Write a description for this page which will be used for Search Engines."
      }
    }
  },
  "additionalProperties": false,
  "required": ["title", "steps"]
};

const uiSchema = {
  additionalContent: {
    "ui:widget": "textarea",
    "ui:options": {
      "rows": 5
    }
  },
  steps: {
    items: {
      'ui:widget': 'textarea',
    }
  },
};

const QUERY = `
query servicePage($pageID: ID!) {
  allServicePages(id:$pageID) {
    edges {
      node {
        id
        title
        steps
        additionalContent
        dynamicContent
        searchDescription
      }
    }
  }
}`;

const log = (type) => console.log.bind(console, type);


class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({ query }) {
    const title = `Editing page ${query.id}`;
    const pageID = decodeURIComponent(query.id);

    const d = {
      query: QUERY,
      variables: {
        pageID: pageID,
      },
    };
    const { data: resp } = await axios.post('', d);

    return {pageID, title, page: resp.data.allServicePages.edges[0].node};
  }

  render() {
    const {pageID, page: {id, ...formData}} = this.props;

    formData.steps = formData.steps.match(/<li>(.*?)<\/li>/g).map(match => {
      return match.replace(/^<li><p>|<\/p><\/li>$/g, '');
    });

    return (
      <div title={`Editing page ${pageID}`}>
        <h1>Editing Page {pageID}</h1>

        <Form schema={schema} uiSchema={uiSchema} formData={formData} onChange={log("changed")} onSubmit={log("submitted")} onError={log("errors")} />

        <style jsx>{`
        `}</style>
      </div>
    )
  }
}

export default withAppLayout(Page);
