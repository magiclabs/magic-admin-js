# Magic Authentication Admin Javascript SDK

[![Publish](https://github.com/magiclabs/magic-admin-js/actions/workflows/publish.yml/badge.svg?branch=master)](https://github.com/magiclabs/magic-admin-js/actions/workflows/publish.yml)
> The Magic Admin SDK lets developers secure endpoints, manage users, and create middlewares via easy-to-use utilities.

<p align="center">
  <a href="./LICENSE">License</a> ·
  <a href="./CHANGELOG.md">Changelog</a> ·
  <a href="./CONTRIBUTING.md">Contributing Guide</a>
</p>

## 📖 Documentation

See the [developer documentation](https://magic.link/docs/api-reference/server-side-sdks/node) to learn how you can master the Magic Admin SDK in a matter of minutes.

## 🔗 Installation

Integrating your Node.js application with Magic will require our server-side NPM package:

```bash
# Via NPM:
npm install --save @magic-sdk/admin

# Via Yarn:
yarn add @magic-sdk/admin
```

## ⚡️ Quick Start

Sign up or log in to the [developer dashboard](https://dashboard.magic.link) to receive API keys that will allow your application to interact with Magic's administration APIs.

```ts
const { Magic } = require('@magic-sdk/admin');

// In async function:
const magic = await Magic.init('YOUR_SECRET_API_KEY');
// OR
Magic.init('YOUR_SECRET_API_KEY').then((magic) => {
  magic
});
// Validate a token
try {
  magic.token.validate("DIDToken");
} catch (e) {
  console.log(e);
}
// Magic Auth - Get User Email
try {
  await magic.users.getMetadataByToken("DIDToken");
} catch (e) {
  console.log(e);
}
```
