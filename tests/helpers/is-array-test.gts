import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { isArray } from '#src/index.ts';

module('helper:isArray', function (hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function (assert) {
    const fakeContextObject = EmberObject.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      valueA: null,
      valueB: null,
    });
    const contextChild = fakeContextObject;

    await render(
      <template>
        {{!@glint-expect-error}}
        [{{isArray contextChild.valueA}}] [{{isArray contextChild.valueB}}] [{{isArray contextChild.valueA contextChild.valueB}}]
      </template>,
    );

    assert.dom().hasText('[false] [false] [false]', 'value should be "[false] [false] [false]"');

    fakeContextObject.set('valueA', []);
    await settled();
    assert.dom().hasText('[true] [false] [false]', 'value should be "[true] [false] [false]"');

    fakeContextObject.set('valueB', []);
    await settled();
    assert.dom().hasText('[true] [true] [true]', 'value should be "[true] [true] [true]"');
  });
});
