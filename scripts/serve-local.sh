#!/usr/bin/env bash

set -o errexit

function finish {
  echo "Shutting down 🔅..."
  docker-compose down
  docker volume rm pearl_node_modules
}
trap finish EXIT


export HOST_IP=$(ifconfig en0 | awk '$1 == "inet" {print $2}')
export CMS_GRAPHIQL="http://$HOST_IP:8000/api/graphiql"

echo "Starting up 🔆..."
docker-compose up --build
