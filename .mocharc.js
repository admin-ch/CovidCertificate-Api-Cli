'use strict'

module.exports = {
  // see https://mochajs.org/#configuring-mocha-nodejs
  diff: true,
  extension: ["ts"],
  package: "./package.json",
  reporter: "spec",
  slow: 1000,
  timeout: 5000,
  'watch-files': ["src/**/*.ts", "test/**/*.ts", "test-integration/**/*.ts"],
  recursive: true,
  // "watch-ignore": ["lib/vendor"]
  require: ['dotenv/config', 'ts-node/register'],
}
