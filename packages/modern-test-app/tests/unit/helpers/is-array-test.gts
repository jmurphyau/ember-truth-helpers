import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { isArray } from 'ember-truth-helpers';

module('helper:isArray', function (hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function (assert) {
    const fakeContextObject = EmberObject.create({
      // @ts-ignore
      valueA: null,
      valueB: null,
    });
    const contextChild = fakeContextObject;

    await render(
      <template>[{{isArray contextChild.valueA}}] [{{isArray contextChild.valueB}}] [{{isArray contextChild.valueA contextChild.valueB}}]</template>
    );

    assert.dom().hasText(
      '[false] [false] [false]',
      'value should be "[false] [false] [false]"'
    );

    run(fakeContextObject, 'set', 'valueA', []);
    assert.dom().hasText(
      '[true] [false] [false]',
      'value should be "[true] [false] [false]"'
    );

    run(fakeContextObject, 'set', 'valueB', []);
    assert.dom().hasText(
      '[true] [true] [true]',
      'value should be "[true] [true] [true]"'
    );
  });
});
