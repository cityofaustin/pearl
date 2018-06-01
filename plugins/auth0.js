import uuid from 'uuid'

import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'

const CLIENT_DOMAIN = 'app94695656.auth0.com';
const CLIENT_ID = 'eEBZI1zkyUDnwyK27dQMHSeK7IHSuZka';
// audience: 'https://app94695656.auth0.com/userinfo',

const getLock = (options) => {
  const Auth0Lock = require('auth0-lock').default
  return new Auth0Lock(CLIENT_ID, CLIENT_DOMAIN, options)
}

const getBaseUrl = () => `${window.location.protocol}//${window.location.host}`

const getOptions = (container) => {
  const secret = uuid.v4();
  setSecret(secret);

  return {
    container,
    closable: false,
    allowSignUp: false,
    theme: {
      logo: `${getBaseUrl()}/static/img/logo.svg`,
      primaryColor: '#31324F',
    },
    auth: {
      responseType: 'token id_token',
      redirectUrl: `${getBaseUrl()}/login/success`,
      params: {
        scope: 'openid profile email',
        state: secret
      }
    }
  }
}

export const show = (container) => getLock(getOptions(container)).show()
export function login(params) {
  const {id_token: token, state: secret} = params;
  console.log(`Verifying token=${token.substring(0, 50)}..., secret=${secret}`)
  if (!checkSecret(secret) || !token) {
    const msg = 'Something 😿 happened with the login request. Are you a hacker?';
    console.error(msg)
    throw new Error(msg);
  }

  setToken(token)
  clearSecret();
}
export function logout() {
  clearCookies();
  getLock().logout({ returnTo: getBaseUrl() });
}

const SECRET_COOKIE_NAME = 'secret';

function setSecret(secret) {
  Cookie.set(SECRET_COOKIE_NAME, secret);
}

export function checkSecret(secret) {
  if (!process.browser) {
    return;
  }
  const stored = Cookie.get(SECRET_COOKIE_NAME);
  console.log(`checking ${stored} === ${secret} (${stored === secret})`)
  return stored === secret;
}

export function clearSecret() {
  Cookie.remove(SECRET_COOKIE_NAME);
}

export function setToken(token) {
  if (!process.browser) {
    return;
  }
  Cookie.set('user', jwtDecode(token))
  Cookie.set('jwt', token)
}

export function getUser(ctx) {
  return process.browser ? getUserFromLocalCookie() : getUserFromServerCookie(ctx.req)
}

function getUserFromServerCookie(req) {
  if (!req.headers.cookie) {
    return undefined
  }
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) {
    return undefined
  }
  const jwt = jwtCookie.split('=')[1]
  return jwtDecode(jwt)
}

function getUserFromLocalCookie() {
  return Cookie.getJSON('user')
}

export function clearCookies() {
  if (!process.browser) {
    return;
  }
  Cookie.remove('jwt')
  Cookie.remove('user')
  Cookie.remove('secret')

  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
}
