import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:includes', function(hooks) {
  setupRenderingTest(hooks);

  test('first param is an array', async function(assert) {
    const fakeContextObject = EmberObject.create({
      valueA: [1, 2, 3, 4, 5]
    });
    this.set('contextChild', fakeContextObject);

    await render(
      hbs`[{{includes contextChild.valueA 5}}] [{{includes contextChild.valueA 6}}] [{{includes contextChild.valueA 9}}]`
    );

    assert.equal(find('*').textContent, '[true] [false] [false]', 'value should be "[true] [false] [false]"');

    run(fakeContextObject, 'set', 'valueA', [1, 2, 3, 4, '5']);
    assert.equal(find('*').textContent, '[false] [false] [false]', 'value should be "[false] [false] [false]"');

    run(fakeContextObject, 'set', 'valueA', []);
    assert.equal(find('*').textContent, '[false] [false] [false]', 'value should be "[false] [false] [false]"');
  });

  test('first param is not an array', async function(assert) {
    const fakeContextObject = EmberObject.create({
      valueA: null,
      valueB: 'string',
      valueC: 42,
      valueD: {}
    });
    this.set('contextChild', fakeContextObject);

    await render(
      hbs`[{{includes contextChild.valueA 5}}] [{{includes contextChild.valueA 6}}] [{{includes contextChild.valueA 9}}]`
    );

    assert.equal(find('*').textContent, '[false] [false] [false]', 'value should be "[false] [false] [false]"');

    await render(
      hbs`[{{includes contextChild.valueB 'st'}}] [{{includes contextChild.valueB 6}}] [{{includes contextChild.valueB 9}}]`
    );

    assert.equal(find('*').textContent, '[false] [false] [false]', 'value should be "[false] [false] [false]"');

    await render(
      hbs`[{{includes contextChild.valueC 'st'}}] [{{includes contextChild.valueC 6}}] [{{includes contextChild.valueC 9}}]`
    );

    assert.equal(find('*').textContent, '[false] [false] [false]', 'value should be "[false] [false] [false]"');

    await render(
      hbs`[{{includes contextChild.valueD 'st'}}] [{{includes contextChild.valueD 6}}] [{{includes contextChild.valueD 9}}]`
    );

    assert.equal(find('*').textContent, '[false] [false] [false]', 'value should be "[false] [false] [false]"');
  });
});
