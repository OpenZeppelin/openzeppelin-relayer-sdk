#!/usr/bin/env bash

set -euo pipefail

pnpm changeset version

scripts/changelog.js
