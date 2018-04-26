ts-framework-versioning
======================


[![Build Status](https://travis-ci.org/devnup/ts-framework-versioning.svg?branch=master)](https://travis-ci.org/devnup/ts-framework-versioning)  [![Coverage Status](https://coveralls.io/repos/github/devnup/ts-framework-versioning/badge.svg?branch=master)](https://coveralls.io/github/devnup/ts-framework-versioning?branch=master)

A minimalistic framework for typescript based applications, with async/await and decorators support.

This plugin extends the Server for handling safe versioning using Headers.

```bash
# Install using yarn
yarn add git:https://gitlab.devnup.com/npm/ts-framework-versioning.git#master

# Install using NPM
npm install --save git:https://gitlab.devnup.com/npm/ts-framework-versioning.git#master
```

## Getting Started (TS-Framework)

Add the module as a Server middleware overriding the router registration method.

```typescript
import Server from 'ts-framework';
import { Versioning } from 'ts-framework-versioning';

class MyServer extends Server {
  constructor() {
    super({
      port: process.env.PORT as any || 3333,
      routes: {
        get: { '/': (req, res) => res.success({ test: 'ok' }) }
      },
    })
  }

  public register() {
    // Initialize the version middleware
    this.app.use(Versioning.middleware({
      current: '1.2.3', // Required field
      minimum: '1.2.0', // Optional field, will ensure minimum version for all requests
      recommended: '1.2.1', // Optional field, will set a recommended version header
    }));

    // Continue with the router initialization
    return super.register();
  }
}
```
<br />

## Getting Started (Express)

This module is also compatible with an Express server.

```typescript
const express = require('express');
const { Versioning } = require('ts-framework-versioning');

const app = express();

app.use(Versioning.middleware({
  current: '1.2.3', // Required field
  minimum: '1.2.0', // Optional field, will ensure minimum version for all requests
  recommended: '1.2.1', // Optional field, will set a recommended version header
}));

app.listen(3000, () => console.log('Server listening on port: 3000'));
```
<br />

## Documentation

#### new Versioning(options: VersioningOptions)
- **options.current (Required):** The current version, should be a valid [Semver](https://semver.org) tag.
- **options.recommended:** The recommended version, should be a valid [Semver](https://semver.org) tag.
- **options.minimum:** The minimum version, should be a valid [Semver](https://semver.org) tag.
- **options.header:** The header for specifing the current API version, defaults to ```X-API-Version```.
- **options.requestedHeader:** The header for specifing the requested API version, defaults to ```X-API-Requested-Version```.
- **options.recommendedHeader:** The header for specifing the recommended API version, defaults to ```X-API-Recommended-Version```.

## License

The project is licensed under the [MIT License](./LICENSE.md).