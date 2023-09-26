import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('helper:is-none', function(hooks) {
  setupRenderingTest(hooks);

  test('undefined/null values', async function(assert) {
    this.set('thisIsUndefined', undefined)
    this.set('thisIsNull', null)
    this.set('thisIsNotNull', new Date())
    await render(hbs`[{{is-none thisIsUndefined}}] [{{is-none thisIsNull}}] [{{is-none thisIsNotNull}}]`);

    assert.equal(this.element.textContent, '[true] [true] [false]', 'value should be "[true] [true] [false]"');
  });

  test('boolean values', async function(assert) {
    await render(hbs`[{{is-none true}}] [{{is-none false}}]`);

    assert.equal(this.element.textContent, '[false] [false]', 'value should be "[false] [false]"');
  });

  test('objects', async function(assert) {
    this.set('emptyObject', {})
    this.set('notEmptyObject', { some: 'object' })
    await render(hbs`[{{is-none emptyObject}}] [{{is-none notEmptyObject}}]`);

    assert.equal(this.element.textContent, '[false] [false]', 'value should be "[false] [false]"');
  });

  test('arrays', async function(assert) {
    this.set('emptyArray', [])
    this.set('notEmptyArray', [ 'a', 8, {} ])
    await render(hbs`[{{is-none emptyArray}}] [{{is-none notEmptyArray}}]`);

    assert.equal(this.element.textContent, '[false] [false]', 'value should be "[true] [false]"');
  });

  test('strings', async function(assert) {
    this.set('emptyString', '')
    this.set('whitespaceString', '   ')
    this.set('notEmptyString', 'full of text')
    await render(hbs`[{{is-none emptyString}}] [{{is-none whitespaceString}}] [{{is-none notEmptyString}}]`);

    assert.equal(this.element.textContent, '[false] [false] [false]', 'value should be "[true] [false] [false]"');
  });
});
