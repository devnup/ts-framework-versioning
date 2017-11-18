import { Versioning } from "../lib";
import * as request from 'supertest';
import Server from 'ts-framework';

describe('lib.Server', () => {
  class TestServer extends Server {
    constructor() {
      super({
        port: process.env.PORT as any || 3333,
        routes: {
          get: { '/': (req, res) => res.success({ test: 'ok' }) }
        },
      })
    }

    public register() {
      this.app.use(Versioning.middleware({
        current: '1.2.3',
        minimum: '1.2.0',
        recommended: '1.2.1',
      }))
      return super.register();
    }
  }

  it('should set the appropriate version headers', async () => {
    // Initialize a simple server
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/')
      .expect('Content-Type', /json/)
      .expect('X-API-Version', '1.2.3')
      .expect(200, { test: 'ok' });
  });

  it('should not accept an invalid version', async () => {
    // Initialize a simple server
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/')
      .set('X-API-Requested-Version', 'blah')
      .expect('Content-Type', /json/)
      .expect('X-API-Version', '1.2.3')
      .expect(400);
  });

  it('should accept the current version', async () => {
    // Initialize a simple server
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/')
      .set('X-API-Requested-Version', '1.2.3')
      .expect('Content-Type', /json/)
      .expect('X-API-Version', '1.2.3')
      .expect(200);
  });

  it('should accept a version higher than the recommended', async () => {
    // Initialize a simple server
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/')
      .set('X-API-Requested-Version', '1.2.2')
      .expect('Content-Type', /json/)
      .expect('X-API-Version', '1.2.3')
      .expect(200);
  });

  it('should accept the recommended version', async () => {
    // Initialize a simple server
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/')
      .set('X-API-Requested-Version', '1.2.3')
      .expect('Content-Type', /json/)
      .expect('X-API-Version', '1.2.3')
      .expect(200);
  });

  it('should accept the minimum version and set recommended header', async () => {
    // Initialize a simple server
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/')
      .set('X-API-Requested-Version', '1.2.0')
      .expect('Content-Type', /json/)
      .expect('X-API-Version', '1.2.3')
      .expect('X-API-Recommended-Version', '1.2.1')
      .expect(200);
  });

  it('should not accept a version below the minimum', async () => {
    // Initialize a simple server
    const server = new TestServer();

    // Perform a simple request to get a 200 response
    await request(server.app).get('/')
      .set('X-API-Requested-Version', '1.0.0')
      .expect('Content-Type', /json/)
      .expect('X-API-Version', '1.2.3')
      .expect('X-API-Recommended-Version', '1.2.1')
      .expect(400);
  });


});