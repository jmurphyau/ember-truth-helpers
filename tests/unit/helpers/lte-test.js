import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:lte', function(hooks) {
  setupRenderingTest(hooks);

  test('boolean values', async function(assert) {
    assert.expect(1);
    await render(hbs`[{{lte true true}}] [{{lte true false}}] [{{lte false true}}] [{{lte false false}}]`);

    assert.equal(find('*').textContent, '[true] [false] [true] [true]', 'value should be "[false] [false] [true] [true]"');
  });

  test('integer values', async function(assert) {
    assert.expect(1);
    await render(hbs`[{{lte 1 1}}] [{{lte 1 0}}] [{{lte 0 1}}] [{{lte 0 0}}]`);

    assert.equal(find('*').textContent, '[true] [false] [true] [true]', 'value should be "[false] [false] [true] [true]"');
  });

  test('decimal values', async function(assert) {
    assert.expect(1);
    await render(hbs`[{{lte 19.2 19.2}}] [{{lte 19.2 3.55}}] [{{lte 3.55 19.2}}] [{{lte 3.55 3.55}}]`);

    assert.equal(find('*').textContent, '[true] [false] [true] [true]', 'value should be "[false] [false] [true] [true]"');
  });

  test('integers in strings 1', async function(assert) {
    assert.expect(1);
    await render(
      hbs`[{{lte '1' '1' forceNumber=true}}] [{{lte '1' '0' forceNumber=true}}] [{{lte '0' '1' forceNumber=true}}] [{{lte '0' '0' forceNumber=true}}]`
    );

    assert.equal(find('*').textContent, '[true] [false] [true] [true]', 'value should be "[false] [false] [true] [true]"');
  });

  test('integers in strings 2', async function(assert) {
    assert.expect(1);
    await render(
      hbs`[{{lte '102' '102' forceNumber=true}}] [{{lte '102' '98' forceNumber=true}}] [{{lte '98' '102' forceNumber=true}}] [{{lte '98' '98' forceNumber=true}}]`
    );

    assert.equal(find('*').textContent, '[true] [false] [true] [true]', 'value should be "[false] [false] [true] [true]"');
  });

  test('decimals in strings', async function(assert) {
    assert.expect(1);
    await render(
      hbs`[{{lte '19.2' '19.2' forceNumber=true}}] [{{lte '19.2' '3.55' forceNumber=true}}] [{{lte '3.55' '19.2' forceNumber=true}}] [{{lte '3.55' '3.55' forceNumber=true}}]`
    );

    assert.equal(find('*').textContent, '[true] [false] [true] [true]', 'value should be "[false] [false] [true] [true]"');
  });
});