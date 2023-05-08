#!/usr/bin/env bash

# 1. Will use official MongoDB image from docker registry
# https://hub.docker.com/_/mongo
#
# 2. Will use volumes to save DB data
#
# `docker volume create trips-webapp-data`
#

docker run \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=root \
  -p 27017:27017 \
  -v trips-webapp-data:/data/db \
  -d --rm --name trips-webapp-mongodb \
  mongo:6.0.5
