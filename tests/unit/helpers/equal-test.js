import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:eq', function(hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function(assert) {
    assert.expect(1);
    await render(hbs`[{{eq true true}}] [{{eq true false}}] [{{eq false true}}] [{{eq false false}}]`);

    assert.equal(find('*').textContent, '[true] [false] [false] [true]', 'value should be "[true] [false] [false] [true]"');
  });

  test('simple test 2', async function(assert) {
    assert.expect(4);
    const fakeContextObject = EmberObject.create({
      valueA: null,
      valueB: null
    });

    this.set('contextChild', fakeContextObject);

    await render(
      hbs`[{{eq contextChild.valueA contextChild.valueB}}] [{{eq contextChild.valueB contextChild.valueA}}]`
    );

    assert.equal(find('*').textContent, '[true] [true]', 'value should be "[true] [true]"');

    run(fakeContextObject, 'set', 'valueA', undefined);
    assert.equal(find('*').textContent, '[false] [false]', 'value should be "[false] [false]"');

    run(fakeContextObject, 'set', 'valueB', undefined);
    assert.equal(find('*').textContent, '[true] [true]', 'value should be "[true] [true]"');

    run(fakeContextObject, 'set', 'valueA', 'yellow');
    run(fakeContextObject, 'set', 'valueB', 'yellow');
    assert.equal(find('*').textContent, '[true] [true]', 'value should be "[true] [true]"');

  });
});