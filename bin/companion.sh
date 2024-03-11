#!/usr/bin/env bash

# Load local env vars. In CI, these are injected.
if [ -f .env ]; then
  nodemon --watch packages/@ImgProcessor/companion/src --exec node -r dotenv/config ./packages/@ImgProcessor/companion/src/standalone/start-server.js
else
  env \
    COMPANION_DATADIR="./output" \
    COMPANION_DOMAIN="localhost:3020" \
    COMPANION_PROTOCOL="http" \
    COMPANION_PORT=3020 \
    COMPANION_CLIENT_ORIGINS="" \
    COMPANION_SECRET="development" \
    COMPANION_PREAUTH_SECRET="development2" \
    COMPANION_ALLOW_LOCAL_URLS="true" \
    nodemon --watch packages/@ImgProcessor/companion/src --exec node ./packages/@ImgProcessor/companion/src/standalone/start-server.js
fi

