#!/bin/bash


# check if there are two command line arguments
if [ "$#" -lt 2 ]; then
  echo "Sets artifactory credentials in all relevant files"
  echo "Usage: $0 ARTIFACTORY_USER_NAME ARTIFACTORY_USER_KEY <.npmrc destination>" >&2
  exit 1
fi

# create .npmrc at project root to set artifactory as registry

NPM_AUTH=$(echo -n $1:$2 | base64 --wrap=0)
echo "_auth=${NPM_AUTH}" > .npmrc
echo "email=${ART_EMAIL}" >> .npmrc
echo "always-auth=true" >> .npmrc

echo "copying .npmrc to: " $3
cp .npmrc $3/.npmrc
