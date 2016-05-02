module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-1.10.x',
      dependencies: { 'ember': '1.10.1' }
    },
    {
      name: 'ember-1.11.x',
      dependencies: { 'ember': '1.11.4' }
    },
    {
      name: 'ember-1.12.x',
      dependencies: { 'ember': '1.12.2' }
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
      dependencies: { 'ember': '2.4.5' }
    },
    {
      name: 'ember-2.5.x',
      dependencies: { 'ember': '2.5.1' }
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
