import 'ember-source/types';
import 'ember-source/types/preview';

// import '@glint/environment-ember-loose';
// import '@glint/environment-ember-template-imports';

import EmberTruthRegistry from 'ember-truth-helpers/template-registry';
import { TemplateFactory } from 'ember-cli-htmlbars';

// Types for compiled templates
declare module 'modern-test-app/templates/*' {
  const tmpl: TemplateFactory;
  export default tmpl;
}

// glint types
declare module '@glint/environment-ember-loose/registry' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export default interface Registry extends EmberTruthRegistry {
    // add custom types here
    // refer to: https://typed-ember.gitbook.io/glint/environments/ember/using-addons#typing-your-dependencies
  }
}
