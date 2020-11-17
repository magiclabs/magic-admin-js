#!/usr/bin/env bash

echo
boxen --border-color cyan --dim-border --padding 1 "🏗 Building Magic Admin SDK for development."
echo

# Increase memory limit for Node
export NODE_OPTIONS=--max_old_space_size=4096

export NODE_ENV=development

npx tsc -w -p ./config/tsconfig.sdk.json
