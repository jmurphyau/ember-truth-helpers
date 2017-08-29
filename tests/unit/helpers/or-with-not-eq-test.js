import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('or', 'helper:or', {
  integration: true
});

test('simple test 1', function(assert) {
  this.render(
    hbs("[{{or (not-eq true false) (not-eq true false)}}]")
  );

  assert.equal(this.$().text(), '[true]', 'value should be "[true]"');
});

test('simple test 2', function(assert) {
  this.render(
    hbs("[{{or (not-eq true true) (not-eq false false)}}]")
  );

  assert.equal(this.$().text(), '[false]', 'value should be "[true]"');
});

test('simple test 3', function(assert) {
  this.render(
    hbs("[{{or (not-eq true true) (not-eq true false)}}]")
  );

  assert.equal(this.$().text(), '[true]', 'value should be "[true]"');
});

test('simple test 4', function(assert) {
  this.render(
    hbs("[{{or (not-eq true false) (not-eq false false)}}]")
  );

  assert.equal(this.$().text(), '[true]', 'value should be "[true]"');
});

test('simple test 5', function(assert) {
  this.render(
    hbs("[{{#if (or (not-eq true false) (not-eq false false))}}true{{else}}false{{/if}}]")
  );

  assert.equal(this.$().text(), '[true]', 'value should be "[true]"');
});
