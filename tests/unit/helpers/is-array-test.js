import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:is-array', function(hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function(assert) {
    assert.expect(3);
    const fakeContextObject = EmberObject.create({
      valueA: null,
      valueB: null
    });
    this.set('contextChild', fakeContextObject);

    await render(
      hbs`[{{is-array contextChild.valueA}}] [{{is-array contextChild.valueB}}] [{{is-array contextChild.valueA contextChild.valueB}}]`
    );

    assert.equal(find('*').textContent, '[false] [false] [false]', 'value should be "[false] [false] [false]"');

    run(fakeContextObject, 'set', 'valueA', []);
    assert.equal(find('*').textContent, '[true] [false] [false]', 'value should be "[true] [false] [false]"');

    run(fakeContextObject, 'set', 'valueB', []);
    assert.equal(find('*').textContent, '[true] [true] [true]', 'value should be "[true] [true] [true]"');
  });
});