#!/usr/bin/env bash

set -o errexit

export HOST_IP=$(ifconfig en0 | awk '$1 == "inet" {print $2}')
export CMS_GRAPHIQL="http://$HOST_IP:8000/api/graphiql"
docker-compose up --build
