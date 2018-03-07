import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:is-array', function(hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function(assert) {
    const fakeContextObject = EmberObject.create({
      valueA: null,
      valueB: null
    });
    this.set('contextChild', fakeContextObject);

    await render(
      hbs("[{{is-array contextChild.valueA}}] [{{is-array contextChild.valueB}}] [{{is-array contextChild.valueA contextChild.valueB}}]")
    );

    assert.equal(this.$().text(), '[false] [false] [false]', 'value should be "[false] [false] [false]"');

    run(fakeContextObject, 'set', 'valueA', []);
    assert.equal(this.$().text(), '[true] [false] [false]', 'value should be "[true] [false] [false]"');

    run(fakeContextObject, 'set', 'valueB', []);
    assert.equal(this.$().text(), '[true] [true] [true]', 'value should be "[true] [true] [true]"');
  });
});