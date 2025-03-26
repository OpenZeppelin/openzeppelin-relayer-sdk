#!/usr/bin/env bash

set -euo pipefail

changeset version

scripts/format-changelog.js
