// Easily allow apps, which are not yet using strict mode templates, to consume your Glint types, by importing this file.
// Add all your components, helpers and modifiers to the template registry here, so apps don't have to do this.
// See https://typed-ember.gitbook.io/glint/using-glint/ember/authoring-addons

import type { default as and } from './helpers/and.ts';
import type { default as eq } from './helpers/eq.ts';
import type { default as gt } from './helpers/gt.ts';
import type { default as gte } from './helpers/gte.ts';
import type { default as isArray } from './helpers/is-array.ts';
import type { default as isEmpty } from './helpers/is-empty.ts';
import type { default as isEqual } from './helpers/is-equal.ts';
import type { default as lt } from './helpers/lt.ts';
import type { default as lte } from './helpers/lte.ts';
import type { default as notEq } from './helpers/not-eq.ts';
import type { default as not } from './helpers/not.ts';
import type { default as or } from './helpers/or.ts';
import type { default as xor } from './helpers/xor.ts';

export default interface EmberTruthRegistry {
  and: typeof and;
  eq: typeof eq;
  gt: typeof gt;
  gte: typeof gte;
  'is-array': typeof isArray;
  'is-empty': typeof isEmpty;
  'is-equal': typeof isEqual;
  lt: typeof lt;
  lte: typeof lte;
  'not-eq': typeof notEq;
  not: typeof not;
  or: typeof or;
  xor: typeof xor;
}
