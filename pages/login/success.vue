<template>
  <div class="text-center">
    <icon name="circle-notch" scale="10" spin class="fa-spin-slow"></icon>
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/circle-notch'
import Icon from 'vue-awesome/components/Icon'

import auth from '~/plugins/auth0'
import axios from '~/plugins/axios'
import Logo from '~/components/Logo.vue'


export default {
  layout: 'auth',
  head: {
    title: 'Howdy!'
  },
  components: {Icon, Logo},
  data() {
    return {
      errorMessage: '',
    };
  },
  methods: {
  },
  beforeMount() {
    auth.parseHash((err, authResult) => {
      if (err) {
        this.errorMessage = err.errorDescription;
      }
      else if (authResult && authResult.accessToken && authResult.idToken) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        )
        localStorage.setItem('accessToken', authResult.accessToken)
        localStorage.setItem('idToken', authResult.idToken)
        localStorage.setItem('expiresAt', expiresAt)
        localStorage.setItem('user', JSON.stringify(authResult.idTokenPayload));
        if (process.client) {
          document.cookie = `accessToken=${authResult.accessToken};path=/;max-age=${authResult.expiresIn * 1000}`
        }

        // this.authNotifier.emit('authChange', { authenticated: true })
        // router.replace('home')
        this.$router.push('/');
      }
      else {
        this.$router.push('/');
      }
    });
  }
}
</script>

<style type="sass" scoped>
.fa-spin-slow {
  -webkit-animation: fa-spin 1.5s infinite linear;
          animation: fa-spin 1.5s infinite linear;
}
</style>
