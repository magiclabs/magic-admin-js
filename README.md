# Magic Authentication Admin Javascript SDK

The Magic Admin SDK lets developers secure endpoints in their Express-based NodeJS application via easy-to-use utilities and middleware.

## Documentation

See the [Developer Documentation](https://docs.fortmatic.com).

## Installation

Integrating your NodeJS application with Magic Authentication will require our NPM package:

```zsh
npm install --save @magic-sdk/admin
```

## Usage
Sign up or log in to your [Developer Dashboard](https://dashboard.magic.link) to receive API keys.


```jspx
const { Magic } = require('@magic-sdk/admin');
const magic = new Magic(‘YOUR_DEVELOPER_SECRET_KEY’);
```
