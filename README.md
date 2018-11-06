Ember Truth Helpers [![Build Status](https://travis-ci.org/jmurphyau/ember-truth-helpers.svg?branch=master)](https://travis-ci.org/jmurphyau/ember-truth-helpers)
==============================================================================

HTMLBars template helpers for additional truth logic in `if` and `unless` statements.

Installation
------------------------------------------------------------------------------

```
ember install ember-truth-helpers
```

Usage
------------------------------------------------------------------------------

Helper   | JavaScript                                    | HTMLBars                | Variable argument count allowed |
---------|-----------------------------------------------|-------------------------|---------------------------------|
bool     | `Boolean(a)`                                  | `{{bool a}}`            | No
eq       | `if (a === b)`                                | `{{if (eq a b)}}`       | No                              |
not-eq   | `if (a !== b)`                                | `{{if (not-eq a b)}}`   | No                              |
not      | `if (!a)`                                     | `{{if (not a)}}`        | Yes                             |
and      | `if (a && b)`                                 | `{{if (and a b)}}`      | Yes                             |
or       | <code>if (a &#124;&#124; b)</code>            | `{{if (or a b)}}`       | Yes                             |
xor      | <code>if (a && !b &#124;&#124; !a && b)</code>| `{{if (xor a b)}}`      | No                              |
gt       | `if (a > b)`                                  | `{{if (gt a b)}}`       | No                              |
gte      | `if (a >= b)`                                 | `{{if (gte a b)}}`      | No                              |
lt       | `if (a < b)`                                  | `{{if (lt a b)}}`       | No                              |
lte      | `if (a <= b)`                                 | `{{if (lte a b)}}`      | No                              |
is-array | `if (Ember.isArray(a))`                       | `{{if (is-array a)}}`   | Yes                             |
is-empty | `if (Ember.isEmpty(a))`                       | `{{if (is-empty a)}}`   | No                             |
is-equal | `if (Ember.isEqual(a, b))`                    | `{{if (is-equal a b)}}` | No                              |

## API

### is-equal

`is-equal` uses [`Ember.isEqual`](https://emberjs.com/api/#method_isEqual) helper to evaluate equality of two values.
 `eq` should be sufficient for most applications. `is-equal` is necessary when trying to compare a complex object to
 a primitive value.

## Other Helpers

* [ember-get-helper](https://github.com/jmurphyau/ember-get-helper)
* [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers)

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone https://github.com/jmurphyau/ember-truth-helpers.git`
* `cd ember-truth-helpers`
* `yarn`

### Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
