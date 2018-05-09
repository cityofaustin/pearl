<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
      <h1>Pages</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button class="btn btn-sm btn-primary" @click="showDialog = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            Create New Content
          </button>

          <input class="form-control form-control-dark w-100" placeholder="Search" aria-label="Search" type="text">
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Updated</th>
            <th>Type</th>
            <th>Author</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(page, index) in pages" :key="index">
            <td>
              <nuxt-link class="" :to="{ path: `/pages/${page.id}/edit` }">
                {{ page.title }}
              </nuxt-link>
            </td>
            <td>{{ page.lastUpdated }}</td>
            <td>{{ page.pageType }}</td>
            <td>JonesR</td>
            <td>{{ page.hasUnpublishedChanges ? 'In Progress' : 'Published' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <CreatePageWizard :class="{'d-block': showDialog, show: showDialog }" v-if="showDialog" :themes="themes" />

  </div>
</template>


<script>
import moment from 'moment'

import axios from '~/plugins/axios'

import CreatePageWizard from '~/components/CreatePageWizard'

const WEF = `
{
  allPages: allServicePages {
    edges {
      node {
        id
        title
        hasUnpublishedChanges
        latestRevisionCreatedAt
      }
    }
  }
  allThemes: allThemes {
    edges {
      node {
        id
        text
        description
        topics {
          edges {
            node {
              id
              text
              description
            }
          }
        }
      }
    }
  }
}`;


export default {
  components: {CreatePageWizard},
  head: {
    title: 'Pages'
  },
  asyncData({ req, params }) {
    const d = {
      query: WEF,
      variables: null,
    };

    return axios.post('', d)
      .then((res) => {
        const pages = [];
        res.data.data.allPages.edges.forEach((n) => {
          const page = Object.assign({}, n.node);
          if (page.latestRevisionCreatedAt) {
            page.lastUpdated = moment(page.latestRevisionCreatedAt).fromNow();
            pages.push(page);
          }
        });

        const themes = res.data.data.allThemes.edges.map((n) => {
          const theme = Object.assign({}, n.node);
          theme.topics = theme.topics.edges.map((n) => Object.assign({}, n.node));
          return theme;
        });

        return {pages, themes};
      })
  },
  data: () => {
    return {
      showDialog: false,
    };
  },
  methods: {
    createPage() {
      this.showDialog = true;
    },
    cancelCreatePage() {
      this.showDialog = false;
    }
  }
}
</script>
