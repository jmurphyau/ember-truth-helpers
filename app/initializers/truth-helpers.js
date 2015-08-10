import Ember from 'ember';
import { registerHelper } from 'ember-truth-helpers/utils/register-helper';

import { andHelper } from 'ember-truth-helpers/helpers/and';
import { orHelper } from 'ember-truth-helpers/helpers/or';
import { equalHelper } from 'ember-truth-helpers/helpers/equal';
import { notHelper } from 'ember-truth-helpers/helpers/not';
import { isArrayHelper } from 'ember-truth-helpers/helpers/is-array';
import { notEqualHelper } from 'ember-truth-helpers/helpers/not-equal';
import { gtHelper } from 'ember-truth-helpers/helpers/gt';
import { gteHelper } from 'ember-truth-helpers/helpers/gte';
import { ltHelper } from 'ember-truth-helpers/helpers/lt';
import { lteHelper } from 'ember-truth-helpers/helpers/lte';

export function initialize(/* container, application */) {

  // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
  // will be auto-discovered.
  if (Ember.Helper) {
    return;
  }

  registerHelper('and', andHelper);
  registerHelper('or', orHelper);
  registerHelper('eq', equalHelper);
  registerHelper('not', notHelper);
  registerHelper('is-array', isArrayHelper);
  registerHelper('not-eq', notEqualHelper);
  registerHelper('gt', gtHelper);
  registerHelper('gte', gteHelper);
  registerHelper('lt', ltHelper);
  registerHelper('lte', lteHelper);
}

export default {
  name: 'truth-helpers',
  initialize: initialize
};
