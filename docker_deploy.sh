#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
DOCKER_TAG=""
REPO_NAME=$(echo $TRAVIS_REPO_SLUG | gawk -F/ '{print $2}')
if [ "$TRAVIS_BRANCH" == "develop" ]; then
  DOCKER_TAG=beta
fi
if [ "$TRAVIS_BRANCH" == "master" ]; then
  DOCKER_TAG=stable
fi

if [ "$DOCKER_TAG" != "" ]; then
  docker tag $TRAVIS_REPO_SLUG/$TRAVIS_BRANCH seascomputing/$REPO_NAME:$DOCKER_TAG
  docker push seascomputing/$REPO_NAME:$DOCKER_TAG
fi
