ts-framework-versioning
======================

[![pipeline status](https://gitlab.devnup.com/npm/ts-framework-versioning/badges/master/pipeline.svg)](https://gitlab.devnup.com/npm/ts-framework-versioning/commits/master)
[![coverage report](https://gitlab.devnup.com/npm/ts-framework-versioning/badges/master/coverage.svg)](https://gitlab.devnup.com/npm/ts-framework-versioning/commits/master)

A minimalistic framework for typescript based applications, with async/await and decorators support.

This plugin extends the Server for handling safe versioning using Headers.

## Getting Started

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

    // Continue with the router register
    return super.register();
  }
}
```

## Documentation

#### new Versioning(options: VersioningOptions)
- **options.current (Required):** The current version, should be a valid [Semver](https://semver.org) tag.
- **options.recommended:** The recommended version, should be a valid [Semver](https://semver.org) tag.
- **options.minimum:** The minimum version, should be a valid [Semver](https://semver.org) tag.
- **options.header:** The header for specifing the current API version, defaults to ```X-API-Version```.
- **options.requestedHeader:** The header for specifing the recommended API version, defaults to ```X-API-Requested-Version```.
- **options.recommendedHeader:** The header for specifing the recommended API version, defaults to ```X-API-Recommended-Version```.

## License

The project is licensed under the [MIT License](./LICENSE.md).