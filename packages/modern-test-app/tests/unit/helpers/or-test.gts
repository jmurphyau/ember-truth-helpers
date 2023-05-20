import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { or } from 'ember-truth-helpers';

module('helper:or', function (hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function (assert) {
    await render(<template>[{{or true 1 ' ' null undefined}}]</template>);

    assert.dom().hasText('[true]', 'value should be "[true]"');
  });

  test('simple test 2', async function (assert) {
    await render(<template>[{{or null undefined true 1 ' '}}]</template>);

    assert.dom().hasText('[true]', 'value should be "[true]"');
  });

  test('simple test 3', async function (assert) {
    await render(
      <template>[{{or false}}] [{{or true}}] [{{or 1}}] [{{or ''}}] [{{or false ''}}] [{{or true ''}}] [{{or '' true}}]</template>
    );

    assert
      .dom()
      .hasText(
        '[false] [true] [1] [] [] [true] [true]',
        'value should be "[false] [true] [1] [] [] [true] [true]"'
      );
  });

  test('simple test 4', async function (assert) {
    const fakeContextObject = EmberObject.create({
      valueA: null,
      valueB: null,
    });

    const contextChild = fakeContextObject;

    await render(
      // @ts-ignore
      <template>[{{or contextChild.valueA}}] [{{or contextChild.valueB}}] [{{or contextChild.valueB contextChild.valueA}}] [{{or contextChild.valueA contextChild.valueB}}]</template>
    );

    assert.dom().hasText('[] [] [] []', 'value should be "[] [] [] []"');

    run(fakeContextObject, 'set', 'valueA', undefined);
    assert.dom().hasText('[] [] [] []', 'value should be "[] [] [] []"');

    run(fakeContextObject, 'set', 'valueA', '');
    assert.dom().hasText('[] [] [] []', 'value should be "[] [] [] []"');

    run(fakeContextObject, 'set', 'valueA', ' ');
    assert.dom().hasText('[ ] [] [ ] [ ]', 'value should be "[ ] [] [ ] [ ]"');

    run(fakeContextObject, 'set', 'valueB', 'yellow');
    assert
      .dom()
      .hasText(
        '[ ] [yellow] [yellow] [ ]',
        'value should be "[ ] [yellow] [yellow] [ ]"'
      );
  });
});
