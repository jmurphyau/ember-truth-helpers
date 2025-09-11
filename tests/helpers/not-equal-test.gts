import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { notEq } from '#src/index.ts';

module('helper:notEqual', function (hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function (assert) {
    await render(
      <template>[{{notEq true true}}] [{{notEq true false}}] [{{notEq false true}}] [{{notEq false false}}]</template>,
    );

    assert.dom().hasText('[false] [true] [true] [false]', 'value should be "[false] [true] [true] [false]"');
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
        [{{notEq contextChild.valueA contextChild.valueB}}] [{{notEq contextChild.valueB contextChild.valueA}}]
      </template>,
    );

    assert.dom().hasText('[false] [false]', 'value should be "[false] [false]"');

    fakeContextObject.set('valueA', undefined);
    await settled();
    assert.dom().hasText('[true] [true]', 'value should be "[true] [true]"');

    fakeContextObject.set('valueB', undefined);
    await settled();
    assert.dom().hasText('[false] [false]', 'value should be "[false] [false]"');

    fakeContextObject.set('valueA', 'yellow');
    fakeContextObject.set('valueB', 'yellow');
    await settled();
    assert.dom().hasText('[false] [false]', 'value should be "[false] [false]"');
  });
});
