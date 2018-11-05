import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:is-equal', function(hooks) {
  setupRenderingTest(hooks);

  test('uses isEqual', async function(assert) {
    this.set('complex', {
      isEqual(value) {
        return 12 === value;
      }
    });

    await render(
      hbs`[{{is-equal complex 12}}] [{{is-equal complex 13}}] [{{is-equal 13 complex}}] [{{is-equal 12 complex}}]`
    );

    assert.equal(find('*').textContent, '[true] [false] [false] [false]', 'value should be "[true] [false] [false] [false]"');
  });
});