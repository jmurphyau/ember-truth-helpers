import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { eq } from '#src/index.ts';

module('helper:eq', function (hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function (assert) {
    await render(<template>[{{eq true true}}] [{{eq true false}}] [{{eq false true}}] [{{eq false false}}]</template>);

    assert.dom().hasText('[true] [false] [false] [true]', 'value should be "[true] [false] [false] [true]"');
  });

  test('simple test 2', async function (assert) {
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
        [{{eq contextChild.valueA contextChild.valueB}}] [{{eq contextChild.valueB contextChild.valueA}}]
      </template>,
    );

    assert.dom().hasText('[true] [true]', 'value should be "[true] [true]"');

    fakeContextObject.set('valueA', undefined);
    await settled();
    assert.dom().hasText('[false] [false]', 'value should be "[false] [false]"');

    fakeContextObject.set('valueB', undefined);
    await settled();
    assert.dom().hasText('[true] [true]', 'value should be "[true] [true]"');

    fakeContextObject.set('valueA', 'yellow');
    fakeContextObject.set('valueB', 'yellow');
    await settled();
    assert.dom().hasText('[true] [true]', 'value should be "[true] [true]"');
  });
});
