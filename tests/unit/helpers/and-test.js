import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('and', 'helper:and', {
  integration: true
});

test('boolean values', function(assert) {
  this.render(
    hbs("[{{and true true}}] [{{and true false}}] [{{and false true}}] [{{and false false}}]")
  );

  assert.equal(this.$().text(), '[true] [false] [false] [false]', 'value should be "[true] [false] [false] [false]"');
});

test('integer values', function(assert) {
  this.render(
    hbs("[{{and 1 1}}] [{{and 1 0}}] [{{and 0 1}}] [{{and 0 0}}]")
  );

  assert.equal(this.$().text(), '[1] [0] [0] [0]', 'value should be "[1] [0] [0] [0]"');
});

test('string values', function(assert) {
  this.render(
    hbs('[{{and " " " "}}] [{{and " " ""}}] [{{and "" " "}}] [{{and "" ""}}]')
  );

  assert.equal(this.$().text(), '[ ] [] [] []', 'value should be "[ ] [] [] []"');
});


test('undefined list length and boolean', function(assert) {
  this.render(
    hbs('[{{and array.length 1}}]')
  );

  assert.equal(this.$().text(), '[]', 'value should be "[]"');
});

test('null list length and boolean', function(assert) {
  this.set('array', null);

  this.render(
    hbs('[{{and array.length 1}}]')
  );

  assert.equal(this.$().text(), '[]', 'value should be "[]"');
});

test('empty list length and boolean', function(assert) {
  this.set('array', []);

  this.render(
    hbs('[{{and array.length 1}}]')
  );

  assert.equal(this.$().text(), '[0]', 'value should be "[0]"');
});

test('non-empty list length and boolean', function(assert) {
  this.set('array', ['a']);

  this.render(
    hbs('[{{and array.length 2}}]')
  );

  assert.equal(this.$().text(), '[2]', 'value should be "[2]"');
});
