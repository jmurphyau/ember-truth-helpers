# Ember Truth Helpers [![CI](https://github.com/jmurphyau/ember-truth-helpers/actions/workflows/ci.yml/badge.svg)](https://github.com/jmurphyau/ember-truth-helpers/actions/workflows/ci.yml)

HTMLBars template helpers for additional truth logic in `if` and `unless` statements.

## Compatibility

- Ember.js v3.28 or above
- Embroider or ember-auto-import >= 2 (this is [v2 addon](https://emberjs.github.io/rfcs/0507-embroider-v2-package-format.html))

## Installation

```
ember install ember-truth-helpers
```

## Usage

Helper   | JavaScript                                      | HTMLBars                | Variable argument count allowed |
---------|-------------------------------------------------|-------------------------|---------------------------------|
eq       | `if (a === b)`                                  | `{{if (eq a b)}}`       | No                              |
not-eq   | `if (a !== b)`                                  | `{{if (not-eq a b)}}`   | No                              |
not      | `if (!a)`                                       | `{{if (not a)}}`        | Yes                             |
and      | `if (a && b)`                                   | `{{if (and a b)}}`      | Yes                             |
or       | <code>if (a &#124;&#124; b)</code>              | `{{if (or a b)}}`       | Yes                             |
xor      | <code>if (a !== b)</code>                       | `{{if (xor a b)}}`      | No                              |
gt       | `if (a > b)`                                    | `{{if (gt a b)}}`       | No                              |
gte      | `if (a >= b)`                                   | `{{if (gte a b)}}`      | No                              |
lt       | `if (a < b)`                                    | `{{if (lt a b)}}`       | No                              |
lte      | `if (a <= b)`                                   | `{{if (lte a b)}}`      | No                              |
is-array | `if (Ember.isArray(a))`                         | `{{if (is-array a)}}`   | Yes                             |
is-empty | `if (Ember.isEmpty(a))`                         | `{{if (is-empty a)}}`   | No                              |
is-equal | `if (Ember.isEqual(a, b))`                      | `{{if (is-equal a b)}}` | No                              |

## API

### is-equal

`is-equal` uses [`Ember.isEqual`](https://api.emberjs.com/ember/3.14/functions/@ember%2Futils/isEqual) helper to evaluate equality of two values.
 `eq` should be sufficient for most applications. `is-equal` is necessary when trying to compare a complex object to
 a primitive value.

## Other Helpers

* [ember-get-helper](https://github.com/jmurphyau/ember-get-helper)
* [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers)

## Usage with Glint

`ember-truth-helpers` is a glint enabled addon. Add this to your
`types/global.d.ts` file:

```ts
import '@glint/environment-ember-loose';

import type EmberTruthRegistry from 'ember-truth-helpers/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberTruthRegistry, /* other addon registries */ {
    // local entries
  }
}
```

For the entire guide, please refer to [Using
Addons](https://typed-ember.gitbook.io/glint/environments/ember/using-addons#using-glint-enabled-addons)
section on the glint handbook.

Types are made available through package.json `exports` field. In order for TS
to recognize this (beginning from TS 4.7), you must set
[`moduleResolution`](https://www.typescriptlang.org/tsconfig#moduleResolution)
to `node16` or `nodenext`.

## Usage in Single File Components

For usage in `gts` or `gjs` files, all helpers are exported from the index:

```gts
import { or } from 'ember-truth-helpers';

<template>
  {{#if (or @admin @user)}}
    Admin Controls are going here
  {{/if}}
</template>
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
