#!/usr/bin/env node
const OpenAPI = require('openapi-typescript-codegen');
(async () => {
  await OpenAPI.generate({
    input: 'api-doc.json',
    output: 'src/api',
    httpClient: 'node',
    exportSchemas: false,
    exportCore: false,
    exportServices: false,
  });

  console.log('Done');
})();
