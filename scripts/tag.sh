#!/usr/bin/env bash

set -euo pipefail

dist_tag() {
  PACKAGE_JSON_NAME="$(jq -r .name ./package.json)"
  LATEST_NPM_VERSION="$(npm info "$PACKAGE_JSON_NAME" version)"
  PACKAGE_JSON_VERSION="$(jq -r .version ./package.json)"
  
  if [ "$PRERELEASE" = "true" ]; then
    echo "next"
  elif npx semver -r ">$LATEST_NPM_VERSION" "$PACKAGE_JSON_VERSION" > /dev/null; then
    echo "latest"
  else
    echo "tmp"
  fi
}

gh_tag() {
  jq -r .version package.json
}

echo "tag=$(dist_tag)" >> $GITHUB_OUTPUT
echo "version=$(gh_tag)" >> $GITHUB_OUTPUT
