# Magic Authentication Admin Javascript SDK

[![<MagicHQ>](https://circleci.com/gh/MagicHQ/magic-admin-js.svg?style=shield)](https://circleci.com/gh/MagicHQ/magic-admin-js)
[![Known Vulnerabilities](https://snyk.io/test/github/MagicHQ/magic-admin-js/badge.svg?targetFile=package.json)](https://snyk.io/test/github/MagicHQ/magic-admin-js?targetFile=package.json)

> The Magic Admin SDK lets developers secure endpoints, manage users, and create middlewares via easy-to-use utilities.

<p align="center">
  <a href="./LICENSE">License</a> ·
  <a href="./CHANGELOG.md">Changelog</a> ·
  <a href="./CONTRIBUTING.md">Contributing Guide</a>
</p>

## 📖 Documentation

See the [developer documentation](https://docs.magic.link/admin-sdk/node-js) to learn how you can master the Magic Admin SDK in a matter of minutes.

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

const magic = new Magic('YOUR_SECRET_API_KEY');

// Read the docs to learn about next steps! 🚀
```
