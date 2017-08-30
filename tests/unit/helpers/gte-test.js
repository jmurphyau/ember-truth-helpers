import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gte', 'helper:gte', {
  integration: true
});

test('boolean values', function(assert) {
  this.render(
    hbs("[{{gte true true}}] [{{gte true false}}] [{{gte false true}}] [{{gte false false}}]")
  );

  assert.equal(this.$().text(), '[true] [true] [false] [true]', 'value should be "[false] [true] [false] [true]"');
});

test('integer values', function(assert) {
  this.render(
    hbs("[{{gte 1 1}}] [{{gte 1 0}}] [{{gte 0 1}}] [{{gte 0 0}}]")
  );

  assert.equal(this.$().text(), '[true] [true] [false] [true]', 'value should be "[true] [true] [false] [true]"');
});

test('decimal values', function(assert) {
  this.render(
    hbs("[{{gte 19.2 19.2}}] [{{gte 19.2 3.55}}] [{{gte 3.55 19.2}}] [{{gte 3.55 3.55}}]")
  );

  assert.equal(this.$().text(), '[true] [true] [false] [true]', 'value should be "[true] [true] [false] [true]"');
});

test('integers in strings 1', function(assert) {
  this.render(
    hbs("[{{gte '1' '1' forceNumber=true}}] [{{gte '1' '0' forceNumber=true}}] [{{gte '0' '1' forceNumber=true}}] [{{gte '0' '0' forceNumber=true}}]")
  );

  assert.equal(this.$().text(), '[true] [true] [false] [true]', 'value should be "[true] [true] [false] [true]"');
});

test('integers in strings 2', function(assert) {
  this.render(
    hbs("[{{gte '102' '102' forceNumber=true}}] [{{gte '102' '98' forceNumber=true}}] [{{gte '98' '102' forceNumber=true}}] [{{gte '98' '98' forceNumber=true}}]")
  );

  assert.equal(this.$().text(), '[true] [true] [false] [true]', 'value should be "[true] [true] [false] [true]"');
});

test('decimals in strings', function(assert) {
  this.render(
    hbs("[{{gte '19.2' '19.2' forceNumber=true}}] [{{gte '19.2' '3.55' forceNumber=true}}] [{{gte '3.55' '19.2' forceNumber=true}}] [{{gte '3.55' '3.55' forceNumber=true}}]")
  );

  assert.equal(this.$().text(), '[true] [true] [false] [true]', 'value should be "[true] [true] [false] [true]"');
});
