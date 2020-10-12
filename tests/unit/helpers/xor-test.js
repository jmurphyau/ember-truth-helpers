import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('helper:xor', function(hooks) {
  setupRenderingTest(hooks);

  test('boolean values', async function(assert) {
    await render(hbs`[{{xor true true}}] [{{xor true false}}] [{{xor false true}}] [{{xor false false}}]`);

    assert.equal(this.element.textContent, '[false] [true] [true] [false]', 'value should be "[false] [true] [true] [false]"');
  });
});
