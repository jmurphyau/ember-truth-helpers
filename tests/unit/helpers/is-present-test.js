import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:is-present', function(hooks) {
  setupRenderingTest(hooks);

  test('undefined/null values', async function(assert) {
    this.set('thisIsUndefined', undefined)
    this.set('thisIsNull', null)
    this.set('thisIsNotNull', new Date())
    await render(hbs("[{{is-present thisIsUndefined}}] [{{is-present thisIsNull}}] [{{is-present thisIsNotNull}}]"));

    assert.equal(this.$().text(), '[false] [false] [true]', 'value should be "[false] [false] [true]"');
  });

  test('boolean values', async function(assert) {
    await render(hbs("[{{is-present true}}] [{{is-present false}}]"));

    assert.equal(this.$().text(), '[true] [true]', 'value should be "[true] [true]"');
  });

  test('objects', async function(assert) {
    this.set('presentObject', {})
    this.set('notpresentObject', { some: 'object' })
    await render(hbs("[{{is-present presentObject}}] [{{is-present notpresentObject}}]"));

    assert.equal(this.$().text(), '[true] [true]', 'value should be "[true] [true]"');
  });

  test('arrays', async function(assert) {
    this.set('presentArray', [])
    this.set('notpresentArray', [ 'a', 8, {} ])
    await render(hbs("[{{is-present presentArray}}] [{{is-present notpresentArray}}]"));

    assert.equal(this.$().text(), '[false] [true]', 'value should be "[false] [true]"');
  });

  test('strings', async function(assert) {
    this.set('presentString', '')
    this.set('whitespaceString', '   ')
    this.set('notpresentString', 'full of text')
    await render(hbs("[{{is-present presentString}}] [{{is-present whitespaceString}}] [{{is-present notpresentString}}]"));

    assert.equal(this.$().text(), '[false] [false] [true]', 'value should be "[false] [false] [true]"');
  });
});
