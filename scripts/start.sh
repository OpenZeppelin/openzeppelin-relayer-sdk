#!/usr/bin/env bash

set -euo pipefail

git fetch

CHANGESETS_STATUS_JSON="$(realpath --relative-to=. "$RUNNER_TEMP/status.json")"

# Save changeset status to temp file
npx changeset status --output="$CHANGESETS_STATUS_JSON"

# Create branch
BRANCH_SUFFIX="$(jq -r '.releases[0].newVersion | gsub("\\.\\d+$"; "")' $CHANGESETS_STATUS_JSON)"
RELEASE_BRANCH="release-v$BRANCH_SUFFIX"
git checkout -b "$RELEASE_BRANCH"

# Output branch
echo "branch=$RELEASE_BRANCH" >> $GITHUB_OUTPUT

# Enter in prerelease state
npx changeset pre enter rc
