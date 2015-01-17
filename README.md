# Ember Truth Helpers for HTMLBars

Helpers for HTMLBars `{{#if}}` & `{{#unless}}`: 

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
