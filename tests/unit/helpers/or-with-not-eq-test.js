import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:or', function(hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function(assert) {
    await render(hbs("[{{or (not-eq true false) (not-eq true false)}}]"));

    assert.equal(find('*').textContent, '[true]', 'value should be "[true]"');
  });

  test('simple test 2', async function(assert) {
    await render(hbs("[{{or (not-eq true true) (not-eq false false)}}]"));

    assert.equal(find('*').textContent, '[false]', 'value should be "[true]"');
  });

  test('simple test 3', async function(assert) {
    await render(hbs("[{{or (not-eq true true) (not-eq true false)}}]"));

    assert.equal(find('*').textContent, '[true]', 'value should be "[true]"');
  });

  test('simple test 4', async function(assert) {
    await render(hbs("[{{or (not-eq true false) (not-eq false false)}}]"));

    assert.equal(find('*').textContent, '[true]', 'value should be "[true]"');
  });

  test('simple test 5', async function(assert) {
    await render(hbs("[{{#if (or (not-eq true false) (not-eq false false))}}true{{else}}false{{/if}}]"));

    assert.equal(find('*').textContent, '[true]', 'value should be "[true]"');
  });
});