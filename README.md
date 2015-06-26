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
gt       | `if (a > b)`                         | `{{if (gt a b)}}`
gte      | `if (a >= b)`                        | `{{if (gte a b)}}`
lt       | `if (a < b)`                         | `{{if (lt a b)}}`
lte      | `if (a <= b)`                        | `{{if (lte a b)}}`
is-array | [Info TBA]                           | [Info TBA]

**`eq`**
```hbs
{{#if (eq 1 2)}} 1 == 2 {{/if}}
{{#unless (eq 1 2)}} 1 != 2 {{/unless}}
```

**`not`**
```hbs
{{#if (not hasCrayons)}} I don't have crayons {{/if}}
{{#if (not hasCrayons hasPaper)}} I don't have crayons or paper {{/if}}
```

**`and`**
```hbs
{{#if (and hasCrayons hasPaper)}} I have crayons and paper {{/if}}
```

**`or`**
```hbs
{{#if (or hasCrayons hasPaper)}} I have something {{/if}}
```

**`is-array`**
```hbs
{{#if (is-array siblings)}}
    {{#each siblings as |sibling|}}
        My sibling: {{sibling}}
    {{/each}}
{{/if}}
```

**`in combination`**
```hbs
{{#if (and (not model.isLoading) model.isError)}}
    There was an error loading the model
{{/if}}
```

**`stand alone`**
```hbs
{{and itsCold myJumper}}
<!--returns `myJumper` if `itsCold` is truthy, otherwise returns `itsCold`-->
```

## Install

* `ember install:addon ember-truth-helpers`

## Other Helpers

* [ember-get-helper](https://github.com/jmurphyau/ember-get-helper)

## Development

* `git clone https://github.com/jmurphyau/ember-truth-helpers.git`
* `npm install`
* `bower install`
* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
