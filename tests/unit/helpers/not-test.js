import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:not', function(hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function(assert) {
    assert.expect(1);
    await render(hbs`[{{not true}}] [{{not false}}] [{{not null}}] [{{not undefined}}] [{{not ''}}] [{{not ' '}}]`);

    assert.equal(find('*').textContent, '[false] [true] [true] [true] [true] [false]', 'value should be "[false] [true] [true] [true] [true] [false]"');
  });

  test('simple test 2', async function(assert) {
    assert.expect(1);
    await render(
      hbs`[{{not true false}}] [{{not true false}}] [{{not null null false null}}] [{{not false null ' ' true}}]`
    );

    assert.equal(find('*').textContent, '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
  });
});