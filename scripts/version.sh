#!/usr/bin/env bash

set -euo pipefail

# Skip versioning for prereleases
if [ "$PRERELEASE" = "true" ]; then
  echo "Skipping versioning for prerelease"
  exit 0
fi

pnpm changeset version

echo "Updating changelog..."
scripts/changelog.js
