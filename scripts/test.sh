#!/usr/bin/env bash

echo
echo "Running unit tests..."
echo

# Increase memory limit for Node
export NODE_OPTIONS=--max_old_space_size=4096

export NODE_ENV=test

if [ -n "$1" ]; then
  input=$(echo $(npx glob $1))
fi

export TS_NODE_PROJECT="test/tsconfig.json"
npx nyc --reporter=lcov --reporter=text-summary ava $input
