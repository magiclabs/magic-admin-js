#!/usr/bin/env bash

echo
boxen --border-color cyan --dim-border --padding 1 "🚦 Running unit tests..."
echo

# Increase memory limit for Node
export NODE_OPTIONS=--max_old_space_size=4096

export NODE_ENV=test

export TS_NODE_PROJECT="test/tsconfig.json"
npx nyc --reporter=lcov --reporter=text-summary ava $input
