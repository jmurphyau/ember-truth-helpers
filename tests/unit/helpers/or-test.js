import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:or', function(hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function(assert) {
    await render(hbs("[{{or true 1 ' ' null undefined}}]"));

    assert.equal(find('*').textContent, '[true]', 'value should be "[true]"');
  });

  test('simple test 2', async function(assert) {
    await render(hbs("[{{or null undefined true 1 ' '}}]"));

    assert.equal(find('*').textContent, '[true]', 'value should be "[true]"');
  });


  test('simple test 3', async function(assert) {
    await render(
      hbs("[{{or false}}] [{{or true}}] [{{or 1}}] [{{or ''}}] [{{or false ''}}] [{{or true ''}}] [{{or '' true}}]")
    );

    assert.equal(find('*').textContent, '[false] [true] [1] [] [] [true] [true]', 'value should be "[false] [true] [1] [] [] [true] [true]"');
  });

  test('simple test 4', async function(assert) {
    const fakeContextObject = EmberObject.create({
      valueA: null,
      valueB: null
    });

    this.set('contextChild', fakeContextObject);

    await render(
      hbs("[{{or contextChild.valueA}}] [{{or contextChild.valueB}}] [{{or contextChild.valueB contextChild.valueA}}] [{{or contextChild.valueA contextChild.valueB}}]")
    );

    assert.equal(find('*').textContent, '[] [] [] []', 'value should be "[] [] [] []"');

    run(fakeContextObject, 'set', 'valueA', undefined);
    assert.equal(find('*').textContent, '[] [] [] []', 'value should be "[] [] [] []"');

    run(fakeContextObject, 'set', 'valueA', '');
    assert.equal(find('*').textContent, '[] [] [] []', 'value should be "[] [] [] []"');

    run(fakeContextObject, 'set', 'valueA', ' ');
    assert.equal(find('*').textContent, '[ ] [] [ ] [ ]', 'value should be "[ ] [] [ ] [ ]"');

    run(fakeContextObject, 'set', 'valueB', 'yellow');
    assert.equal(find('*').textContent, '[ ] [yellow] [yellow] [ ]', 'value should be "[ ] [yellow] [yellow] [ ]"');

  });
});