# Ember Truth Helpers [![Build Status](https://travis-ci.org/jmurphyau/ember-truth-helpers.svg?branch=master)](https://travis-ci.org/jmurphyau/ember-truth-helpers)

HTMLBars template helpers for additional truth logic in `if` and `unless` statements.

## Usage

Helper   | JavaScript                           | HTMLBars
---------|--------------------------------------|-------------------
eq       | `if (a === b)`                       | `{{if (eq a b)}}`
not-eq   | `if (a !== b)`                       | `{{if (not-eq a b)}}`
not      | `if (!a)`                            | `{{if (not a)}}`
and      | `if (a && b)`                        | `{{if (and a b)}}`
or       | <code>if (a &#124;&#124; b)</code>   | `{{if (or a b)}}`
xor      | `if (a && !b || !a && b)`            | `{{if (xor a b)}}`
gt       | `if (a > b)`                         | `{{if (gt a b)}}`
gte      | `if (a >= b)`                        | `{{if (gte a b)}}`
lt       | `if (a < b)`                         | `{{if (lt a b)}}`
lte      | `if (a <= b)`                        | `{{if (lte a b)}}`
is-array | `if (Ember.isArray(a))`              | `{{if (is-array a)}}`
is-equal | `if (Ember.isEqual(a, b))`           | `{{if (is-equal a b)}}`

### API

## is-equal

`is-equal` uses [`Ember.isEqual`](http://emberjs.com/api/#method_isEqual) helper to evaluate equality of two values.
 `eq` should be sufficient for most applications. `is-equal` is necessary when trying to compare a complex object to
 a primitive value.

## Install

* `ember install ember-truth-helpers`

## Other Helpers

* [ember-get-helper](https://github.com/jmurphyau/ember-get-helper)
* [ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers)

## Development

* `git clone https://github.com/jmurphyau/ember-truth-helpers.git`
* `npm install`
* `bower install`
* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
