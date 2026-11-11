import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { and, isArray } from '#src/index.ts';

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

  test('array-like values', async function (assert) {
    const arrayLike = { length: 2 };
    const notANumber = { length: NaN };
    const text = 'abc';
    const map = new Map([['a', 1]]);

    await render(
      <template>[{{isArray arrayLike}}] [{{isArray notANumber}}] [{{isArray text}}] [{{isArray map}}]</template>,
    );

    assert.dom().hasText('[true] [false] [false] [false]');
  });

  test('window and arguments', async function (assert) {
    const win = window;
    const args = (function () {
      // eslint-disable-next-line prefer-rest-params
      return arguments;
    })();

    await render(<template>[{{isArray win}}] [{{isArray args}}]</template>);

    assert.dom().hasText('[false] [true]');
  });

  test('does not read a missing length', async function (assert) {
    // A plain read of a missing key on such an object throws in development, like on a proxy.
    class UnknownProperty extends EmberObject {
      unknownProperty() {
        return 0;
      }
    }
    const unknown = UnknownProperty.create();

    await render(<template>[{{isArray unknown}}] [{{and unknown true}}]</template>);

    assert.dom().hasText('[false] [true]');
  });
});
