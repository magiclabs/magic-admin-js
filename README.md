# Magic Authentication Admin Javascript SDK

The Magic Admin SDK lets developers secure endpoints in their Express-based NodeJS application via easy-to-use middleware.

## Documentation

See the [Developer Documentation](https://docs.fortmatic.com).

## Installation

Integrating your NodeJS application with Magic Authentication will require our NPM package:

```zsh
npm install --save @magic-sdk/admin
```

## Usage
Sign up or log in to your [Developer Dashboard](https://dashboard.fortmatic.com) to receive API keys.


```jspx
const Magic = require('@magic-sdk/admin');

// Create the Admin SDK instance
const magic = new Magic(‘YOUR_DEVELOPER_SECRET_KEY’);

// Apply Express middleware
app.use(magic.middlewares.express);
```
