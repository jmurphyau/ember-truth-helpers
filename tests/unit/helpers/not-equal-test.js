import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('helper:not-equal', function(hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function(assert) {
    await render(
      hbs`[{{not-eq true true}}] [{{not-eq true false}}] [{{not-eq false true}}] [{{not-eq false false}}]`
    );

    assert.equal(this.element.textContent, '[false] [true] [true] [false]', 'value should be "[false] [true] [true] [false]"');
  });

  test('simple test 2', async function(assert) {
    const fakeContextObject = EmberObject.create({
      valueA: null,
      valueB: null
    });

    this.set('contextChild', fakeContextObject);

    await render(
      hbs`[{{not-eq contextChild.valueA contextChild.valueB}}] [{{not-eq contextChild.valueB contextChild.valueA}}]`
    );

    assert.equal(this.element.textContent, '[false] [false]', 'value should be "[false] [false]"');

    run(fakeContextObject, 'set', 'valueA', undefined);
    assert.equal(this.element.textContent, '[true] [true]', 'value should be "[true] [true]"');

    run(fakeContextObject, 'set', 'valueB', undefined);
    assert.equal(this.element.textContent, '[false] [false]', 'value should be "[false] [false]"');

    run(fakeContextObject, 'set', 'valueA', 'yellow');
    run(fakeContextObject, 'set', 'valueB', 'yellow');
    assert.equal(this.element.textContent, '[false] [false]', 'value should be "[false] [false]"');

  });
});
