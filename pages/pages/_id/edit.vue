<template>
  <form-schema :schema="schema" v-model="model" @submit="submit" input-wrapping-class="form-group">
    <button type="submit">Save</button>
  </form-schema>
</template>

<script>
  import FormSchema from 'vue-json-schema'
  import schema from '~/schemas/service-page.json'

  import axios from '~/plugins/axios'

  // To override the default array button props
  FormSchema.setComponent('arraybutton', 'button', {
    native: true, // required to force button rendering as HTML native element
    label: 'Add more item'
  })

  export default {
    components: { FormSchema },
    async asyncData({ params }) {
      const query = `
        query servicePage($pageID: ID!) {
          allServicePages(id:$pageID) {
            edges {
              node {
                id
                title
                additionalContent
                dynamicContent
                searchDescription
              }
            }
          }
        }`;

      const d = {
        query: query,
        variables: {
          pageID: params.id,
        },
      };

      const { data: resp } = await axios.post('', d);
      const data = {
        model: Object.assign({}, resp.data.allServicePages.edges[0].node),
      };
      return data;
    },
    data: () => ({
      schema: schema,
      model: {
        title: 'yolo',
      }
    }),
    methods: {
      submit(e) {
        // this.model contains the valid data according your JSON Schema.
        // You can submit your model to the server here
      }
    },
  }
</script>
