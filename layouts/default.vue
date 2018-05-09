<template>
  <div>
    <nav class="navbar navbar-light fixed-top bg-light flex-md-nowrap p-0 shadow">
      <nuxt-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
        <Logo />
      </nuxt-link>
      <!-- <input class="form-control form-control-dark w-100" placeholder="Search" aria-label="Search" type="text"> -->
      <ul class="navbar-nav ml-auto pr-3">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle-TODO" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <icon name="user" scale="2" v-if="!profileImageURL"></icon>
            <img :src="profileImageURL" width="40" height="40" v-if="profileImageURL">
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="/settings">Settings</a>
            <a class="dropdown-item" href="/logout">Logout</a>
          </div>
        </li>
      </ul>

      <span class="navbar-text pr-3">
        Hello {{ username }}
      </span>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/" exact>
                  <icon name="tachometer-alt"></icon>
                  Dashboard <span class="sr-only">(current)</span>
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/pages">
                  <icon name="regular/file"></icon>
                  Pages
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/performance">
                  <icon name="regular/chart-bar"></icon>
                  Performance
                </nuxt-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/api/graphiql">
                  <icon name="bullhorn"></icon>
                  GraphQL Playground
                </a>
              </li>
            </ul>

            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Saved reports</span>
              <a class="d-flex align-items-center text-muted" href="/report/create">
                <icon name="plus-circle"></icon>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <a class="nav-link" href="/report/current-month">
                  <icon name="file-alt"></icon>
                  Current month
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/report/happiness-index">
                  <icon name="file-alt"></icon>
                  Happiness Index
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <nuxt/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/tachometer-alt'
import 'vue-awesome/icons/regular/file'
import 'vue-awesome/icons/regular/chart-bar'
import 'vue-awesome/icons/plus-circle'
import 'vue-awesome/icons/file-alt'
import 'vue-awesome/icons/bullhorn'
import 'vue-awesome/icons/user'
import Icon from 'vue-awesome/components/Icon'

import Logo from '~/components/Logo'

export default {
  components: {Icon, Logo},
  data() {
    const defaults = {
      username: '',
      email: '',
      profileImageURL: '',
    };

    if (process.client) {
      const u = localStorage.getItem('user');

      if (u) {
        const user = JSON.parse(u);
        defaults.username = user.nickname;
        defaults.profileImageURL = user.picture;
        defaults.email = user.email;
      }
    }

    return defaults;
  },
};

</script>

<style>
body {
  font-size: .875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 80px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

/*
 * Content
 */

[role="main"] {
  padding-top: 80px; /* Space for fixed navbar */
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .90rem;
  padding-bottom: .90rem;
  font-size: 1rem;
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}

/*
 * Utilities
 */

.border-top { border-top: 1px solid #e5e5e5; }
.border-bottom { border-bottom: 1px solid #e5e5e5; }

</style>
