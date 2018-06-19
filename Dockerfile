FROM node:10.0

RUN mkdir /app
WORKDIR /app

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
ENV NODE_PATH=src
ENV NODE_PATH=/app/node_modules

ENV HOST 0.0.0.0
ENV PORT ${PORT:-5000}
EXPOSE $PORT

ARG CMS_API=https://joplin-staging.herokuapp.com/api/graphql
ENV CMS_API $CMS_API

COPY yarn.lock /app/yarn.lock
COPY package.json /app/package.json
RUN yarn


COPY public /app/public
COPY src /app/src

ARG CMS_GRAPHIQL=$CMS_GRAPHIQL

CMD [ "yarn", "start" ]
