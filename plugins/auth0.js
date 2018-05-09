import auth0 from 'auth0-js'

const auth = new auth0.WebAuth({
  domain: 'app94695656.auth0.com',
  clientID: 'eEBZI1zkyUDnwyK27dQMHSeK7IHSuZka',
  redirectUri: 'http://localhost:5000/login/success',
  audience: 'https://app94695656.auth0.com/userinfo',
  responseType: 'token id_token',
});

export default auth;
