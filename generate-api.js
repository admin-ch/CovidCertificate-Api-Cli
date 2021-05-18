#!/usr/bin/env node
const OpenAPI = require('openapi-typescript-codegen');
(async () => {
  await OpenAPI.generate({
    input: 'src/api/api-docs.yaml',
    output: 'src/api',
    httpClient: 'node',
    exportSchemas: false,
    exportCore: false,
    exportServices: false,
  });

  console.log('Done');
})();
