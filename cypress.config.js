const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'vbd53t',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      config.baseUrl = 'http://localhost:3000';

      return config;
    },
  },
});
