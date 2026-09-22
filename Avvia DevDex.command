#!/bin/zsh

set -e

SCRIPT_DIR="${0:A:h}"

if ! command -v npm >/dev/null 2>&1; then
  osascript -e 'display dialog "Node.js non è installato. Installalo e riapri DevDex." buttons {"OK"} with icon caution'
  exit 1
fi

cd "$SCRIPT_DIR"

if [[ ! -d node_modules ]]; then
  npm install --no-audit --no-fund
fi

npm run dev
