import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { eq } from 'ember-truth-helpers';

module('helper:eq', function (hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function (assert) {
    await render(
      <template>[{{eq true true}}] [{{eq true false}}] [{{eq false true}}] [{{eq false false}}]</template>
    );

    assert.dom().hasText(
      '[true] [false] [false] [true]',
      'value should be "[true] [false] [false] [true]"'
    );
  });

  test('simple test 2', async function (assert) {
    const fakeContextObject = EmberObject.create({
      valueA: null,
      valueB: null,
    });

    const contextChild = fakeContextObject;

    await render(
      <template>[{{eq contextChild.valueA contextChild.valueB}}] [{{eq contextChild.valueB contextChild.valueA}}]</template>
    );

    assert.dom().hasText(
      '[true] [true]',
      'value should be "[true] [true]"'
    );

    run(fakeContextObject, 'set', 'valueA', undefined);
    assert.dom().hasText(
      '[false] [false]',
      'value should be "[false] [false]"'
    );

    run(fakeContextObject, 'set', 'valueB', undefined);
    assert.dom().hasText(
      '[true] [true]',
      'value should be "[true] [true]"'
    );

    run(fakeContextObject, 'set', 'valueA', 'yellow');
    run(fakeContextObject, 'set', 'valueB', 'yellow');
    assert.dom().hasText(
      '[true] [true]',
      'value should be "[true] [true]"'
    );
  });
});
