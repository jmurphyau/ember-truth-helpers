import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:is-empty', function(hooks) {
  setupRenderingTest(hooks);

  test('undefined/null values', async function(assert) {
    assert.expect(1);
    this.set('thisIsUndefined', undefined)
    this.set('thisIsNull', null)
    this.set('thisIsNotNull', new Date())
    await render(hbs`[{{is-empty thisIsUndefined}}] [{{is-empty thisIsNull}}] [{{is-empty thisIsNotNull}}]`);

    assert.equal(find('*').textContent, '[true] [true] [false]', 'value should be "[true] [true] [false]"');
  });

  test('boolean values', async function(assert) {
    assert.expect(1);
    await render(hbs`[{{is-empty true}}] [{{is-empty false}}]`);

    assert.equal(find('*').textContent, '[false] [false]', 'value should be "[false] [false]"');
  });

  test('objects', async function(assert) {
    assert.expect(1);
    this.set('emptyObject', {})
    this.set('notEmptyObject', { some: 'object' })
    await render(hbs`[{{is-empty emptyObject}}] [{{is-empty notEmptyObject}}]`);

    assert.equal(find('*').textContent, '[false] [false]', 'value should be "[false] [false]"');
  });

  test('arrays', async function(assert) {
    assert.expect(1);
    this.set('emptyArray', [])
    this.set('notEmptyArray', [ 'a', 8, {} ])
    await render(hbs`[{{is-empty emptyArray}}] [{{is-empty notEmptyArray}}]`);

    assert.equal(find('*').textContent, '[true] [false]', 'value should be "[true] [false]"');
  });

  test('strings', async function(assert) {
    assert.expect(1);
    this.set('emptyString', '')
    this.set('whitespaceString', '   ')
    this.set('notEmptyString', 'full of text')
    await render(hbs`[{{is-empty emptyString}}] [{{is-empty whitespaceString}}] [{{is-empty notEmptyString}}]`);

    assert.equal(find('*').textContent, '[true] [false] [false]', 'value should be "[true] [false] [false]"');
  });
});
