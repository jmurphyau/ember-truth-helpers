import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:bool', function(hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function(assert) {
    this.set('object', {});
    this.set('array', []);

    await render(hbs("[{{bool true}}] [{{bool false}}] [{{bool null}}] [{{bool undefined}}] [{{bool ''}}] [{{bool ' '}}] [{{bool object}}] [{{bool array}}]"));

    assert.equal(this.$().text(), '[true] [false] [false] [false] [false] [true] [true] [true]', 'value should be "[true] [false] [false] [false] [false] [true] [true]"');
  });
});
