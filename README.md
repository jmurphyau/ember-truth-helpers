Ember Truth Helpers [![Build Status](https://travis-ci.org/jmurphyau/ember-truth-helpers.svg?branch=master)](https://travis-ci.org/jmurphyau/ember-truth-helpers)
==============================================================================

HTMLBars template helpers for additional truth logic in `if` and `unless` statements.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-truth-helpers
```

Usage
------------------------------------------------------------------------------

Helper   | JavaScript                                      | HTMLBars                | Variable argument count allowed |
---------|-------------------------------------------------|-------------------------|---------------------------------|
eq       | `if (a === b)`                                  | `{{if (eq a b)}}`       | No                              |
not-eq   | `if (a !== b)`                                  | `{{if (not-eq a b)}}`   | No                              |
not      | `if (!a)`                                       | `{{if (not a)}}`        | Yes                             |
and      | `if (a && b)`*                                  | `{{if (and a b)}}`      | Yes                             |
or       | <code>if (a &#124;&#124; b)</code> *            | `{{if (or a b)}}`       | Yes                             |
xor      | <code>if (a && !b &#124;&#124; !a && b)</code>* | `{{if (xor a b)}}`      | No                              |
gt       | `if (a > b)`                                    | `{{if (gt a b)}}`       | No                              |
gte      | `if (a >= b)`                                   | `{{if (gte a b)}}`      | No                              |
lt       | `if (a < b)`                                    | `{{if (lt a b)}}`       | No                              |
lte      | `if (a <= b)`                                   | `{{if (lte a b)}}`      | No                              |
is-array | `if (Ember.isArray(a))`                         | `{{if (is-array a)}}`   | Yes                             |
is-empty | `if (Ember.isEmpty(a))`                         | `{{if (is-empty a)}}`   | No                              |
is-equal | `if (Ember.isEqual(a, b))`                      | `{{if (is-equal a b)}}` | No                              |

<sup>
  * Unlike their JavaScript counterparts, these expressions do <em>not</em> short circuit.
  For example, with <code>(or a b)</code>, even if <code>a</code> is truthy, <code>b</code> will still be evaluated.
  See <a href="https://github.com/jmurphyau/ember-truth-helpers/issues/58#issuecomment-319798732">this explanation</a>.
</sup>

## API

### is-equal

`is-equal` uses [`Ember.isEqual`](https://api.emberjs.com/ember/3.14/functions/@ember%2Futils/isEqual) helper to evaluate equality of two values.
 `eq` should be sufficient for most applications. `is-equal` is necessary when trying to compare a complex object to
 a primitive value.

## Other Helpers

* [ember-get-helper](https://github.com/jmurphyau/ember-get-helper)
* [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers)

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
