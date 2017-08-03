module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-1.13.x',
      dependencies: { 'ember': '1.13.13' }
    },
    {
      name: 'ember-2.0.x',
      dependencies: { 'ember': '2.0.3' }
    },
    {
      name: 'ember-2.1.x',
      dependencies: { 'ember': '2.1.2' }
    },
    {
      name: 'ember-2.2.x',
      dependencies: { 'ember': '2.2.2' }
    },
    {
      name: 'ember-2.3.x',
      dependencies: { 'ember': '2.3.2' }
    },
    {
      name: 'ember-2.4.x',
      dependencies: { 'ember': '2.4.6' }
    },
    {
      name: 'ember-2.5.x',
      dependencies: { 'ember': '2.5.1' }
    },
    {
      name: 'ember-2.6.x',
      dependencies: { 'ember': '2.6.2' }
    },
    {
      name: 'ember-2.7.x',
      dependencies: { 'ember': '2.7.3' }
    },
    {
      name: 'ember-2.8.x',
      dependencies: { 'ember': '2.8.3' }
    },
    {
      name: 'ember-2.9.x',
      dependencies: { 'ember': '2.9.1' }
    },
    {
      name: 'ember-2.10.x',
      dependencies: { 'ember': '2.10.2' }
    },
    {
      name: 'ember-2.11.x',
      dependencies: { 'ember': '2.11.3' }
    },
    {
      name: 'ember-2.12.x',
      dependencies: { 'ember': '2.12.2' }
    },
    {
      name: 'ember-2.13.x',
      dependencies: { 'ember': '2.13.0' }
    },
    {
      name: 'ember-release',
      dependencies: { 'ember': 'components/ember#release' },
      resolutions: { 'ember': 'release' }
    },
    {
      name: 'ember-beta',
      dependencies: { 'ember': 'components/ember#beta' },
      resolutions: { 'ember': 'beta' }
    },
    {
      name: 'ember-canary',
      dependencies: { 'ember': 'components/ember#canary' },
      resolutions: { 'ember': 'canary' }
    }
  ]
};
