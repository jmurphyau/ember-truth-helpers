import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:and', function(hooks) {
  setupRenderingTest(hooks);

  test('boolean values', async function(assert) {
    assert.expect(1);
    await render(hbs`[{{and true true}}] [{{and true false}}] [{{and false true}}] [{{and false false}}]`);

    assert.equal(find('*').textContent, '[true] [false] [false] [false]', 'value should be "[true] [false] [false] [false]"');
  });

  test('integer values', async function(assert) {
    assert.expect(1);
    await render(hbs`[{{and 1 1}}] [{{and 1 0}}] [{{and 0 1}}] [{{and 0 0}}]`);

    assert.equal(find('*').textContent, '[1] [0] [0] [0]', 'value should be "[1] [0] [0] [0]"');
  });

  test('string values', async function(assert) {
    assert.expect(1);
    await render(hbs`[{{and " " " "}}] [{{and " " ""}}] [{{and "" " "}}] [{{and "" ""}}]`);

    assert.equal(find('*').textContent, '[ ] [] [] []', 'value should be "[ ] [] [] []"');
  });


  test('undefined list length and boolean', async function(assert) {
    assert.expect(1);
    await render(hbs`[{{and array.length 1}}]`);

    assert.equal(find('*').textContent, '[]', 'value should be "[]"');
  });

  test('null list length and boolean', async function(assert) {
    assert.expect(1);
    this.set('array', null);

    await render(hbs`[{{and array.length 1}}]`);

    assert.equal(find('*').textContent, '[]', 'value should be "[]"');
  });

  test('empty list length and boolean', async function(assert) {
    assert.expect(1);
    this.set('array', []);

    await render(hbs`[{{and array.length 1}}]`);

    assert.equal(find('*').textContent, '[0]', 'value should be "[0]"');
  });

  test('non-empty list length and boolean', async function(assert) {
    assert.expect(1);
    this.set('array', ['a']);

    await render(hbs`[{{and array.length 2}}]`);

    assert.equal(find('*').textContent, '[2]', 'value should be "[2]"');
  });
});