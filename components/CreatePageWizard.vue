<template>
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">

        <div v-if="activePage === 0">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="exampleModalCenterTitle">Select the content type</h5>
            <p class="text-center">Please select the type of content you want to add.</p>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="card-deck clickable-deck">
              <a href="#" class="card" v-for="(pageType, index) in pageTypes" :key="index" @click="setPageType(pageType)">
                <div class="card-body">
                  <h5 class="text-center"><icon :name="pageType.icon" scale="4"></icon></h5>
                  <h5 class="text-center card-title">{{ pageType.name }}</h5>
                  <p class="card-text">{{ pageType.description }}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div v-else-if="activePage === 1">
          <div class="modal-header">
            <h5 class="modal-title text-center" id="exampleModalCenterTitle">Write an actionable title for your service page, starting with a verb.</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="pageTitleInput">Page Title</label>
                <input class="form-control" v-model="title" id="pageTitleInput" aria-describedby="pageTitleHelp" placeholder="">
                <small id="pageTitleHelp" class="form-text text-muted">Example: Drop off household hazardous waste and other recyclables</small>
                <small class="form-text text-muted">Psst! You can use up to {{ titleCharsRemaining }} more characters</small>
              </div>
            </form>

            <ul>
              <li>Use simple, accessible language</li>
              <li>Use words you think residents may search to find the service</li>
              <li>You don’t need to worry about including your department’s name in the title</li>
              <li>
                <a href="https://cityofaustin.github.io/digital-services-style-guide/speak-to-the-people-not-over-them/">See more in the Style Guide</a>
              </li>
            </ul>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="activePage++">Continue</button>
          </div>
        </div>

        <div v-else-if="activePage === 2">
          <div class="modal-header">
            <h5 class="modal-title text-center">Please select the topic that best fits</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="card-deck">
              <div class="card" v-for="(theme, index) in customThemes" :key="index">
                <div class="card-body">
                  <h5 class="text-center card-title">{{ theme.text }}</h5>
                  <div class="card-text">
                    <div class="list-group" v-for="(topic, index) in theme.topics" :key="index">
                      <button class="list-group-item list-group-item-action" @click="setActiveTopic(topic)" :class="{active: activeTopic === topic.text}">{{ topic.text }}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="createPage()">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/regular/calendar'
import 'vue-awesome/icons/regular/id-card'
import 'vue-awesome/icons/regular/newspaper'
import 'vue-awesome/icons/list-ol'
import Icon from 'vue-awesome/components/Icon'

import axios from '~/plugins/axios'

export default {
  head: {
    title: 'Create a Page'
  },
  components: {Icon},
  props: {
    themes: {type: Array, default: () => []},
  },
  data: () => {
    return {
      pageTypes: [
        {name: 'Event', icon: 'regular/calendar', description: 'Events are added to your department page automatically.'},
        {name: 'Service', icon: 'list-ol', description: 'A step-by-step guide to a particular city service.'},
        {name: 'Department', icon: 'regular/id-card', description: 'Basic information about a department, including contact information.'},
        {name: 'News Release', icon: 'regular/newspaper', description: 'News releases are time-boxed and are archived after they expire.'},
      ],
      activePage: 0,
      selectedPageType: '',
      title: '',
      activeTopic: '',
    };
  },
  computed: {
    customThemes() {
      const customThemes = [];
      this.themes.forEach((theme) => {
        if (theme.text === 'Housing & Utilities' || theme.text === 'Government & Business') {
          customThemes.push(theme);
        }
      });
      return customThemes;
    },
    titleCharsRemaining() {
      return 54 - this.title.length;
    }
  },
  methods: {
    setPageType(pageType) {
      this.selectedPageType = pageType.name.toUpperCase().replace(/\s+/g, '_');
      this.activePage += 1;
    },
    setActiveTopic(topic) {
      this.activeTopic = topic.text;
    },
    createPage() {
      console.log(`Creating ${this.selectedPageType} page "${this.title}" in ${this.activeTopic}...`);

      const query = `
        mutation createPage($pageType:PageType!, $title:String!, $topic:String!) {
          createPage(pageType:$pageType, title:$title, topic:$topic) {
            page {
              id
              title
            }
          }
        }`;

      const d = {
        query: query,
        variables: {
          pageType: this.selectedPageType,
          title: this.title,
          topic: this.activeTopic,
        },
      };

      return axios.post('', d)
        .then((res) => {
          this.$router.push(`/pages/${res.data.data.createPage.page.id}/edit`);
        });
    }
  }
}
</script>

<style lang="scss" scoped>

.clickable-deck {
  &:hover .card {
    opacity: 0.5;
    transition: opacity .2s ease-in-out;
  }

  a.card {
    text-decoration: none;
    color: inherit;
  }

  .card:hover {
    opacity: 1;

    &:hover {
      box-shadow: 3px 3px 8px #666;
    }
  }
}

</style>
