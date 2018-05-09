# pearl

> CMS Author Interface for austin.gov

## Start Developing

1. Install Docker
2. run `./scripts/serve-local.sh`

## Key Technologies

- [nuxtjs](https://nuxtjs.org/)
- [bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
- [auth0](https://auth0.com/docs)

## Other Considerations

## TODO

Things barely work, and this list is definitely incomplete

- [ ] Create page dialog needs events to open & close nicely
- [ ] Data should be saved to a store (especially login info)
- [ ] Update [`vue-json-schema`](https://github.com/formschema/native) to v2 when it's released so it supports arrays, which are necessary to implement the steps on a service page
- [ ] Don't build the production site when starting dev
- auth
  - [ ] Login doesn't set the `accessToken` until page refresh (probably fixed along with saving data in a store)
  - [ ] Console warning `[Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content.` (this seems caused by accessing localstorage instead of a store)
  - [ ] Add env config vars (e.g. callback URL)
- [ ] It's mostly unstyled
