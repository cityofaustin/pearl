FROM node:10.0

RUN mkdir /app

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
ENV NODE_PATH=src

ENV HOST 0.0.0.0
ENV PORT ${PORT:-5000}
EXPOSE $PORT

ARG CMS_API=https://joplin-staging.herokuapp.com/api/graphql
ENV CMS_API $CMS_API

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
ENV PATH /app/node_modules/.bin:$PATH

COPY . .

ARG CMS_GRAPHIQL=$CMS_GRAPHIQL

CMD [ "yarn", "start" ]
