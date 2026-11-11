import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { getDeprecations, render } from '@ember/test-helpers';
import { isEqual } from '#src/index.ts';

module('helper:isEqual', function (hooks) {
  setupRenderingTest(hooks);

  test('uses isEqual', async function (assert) {
    const complex = {
      isEqual(value: unknown) {
        return 12 === value;
      },
    };

    await render(
      <template>[{{isEqual complex 12}}] [{{isEqual complex 13}}] [{{isEqual 13 complex}}] [{{isEqual 12 complex}}]</template>,
    );

    assert.dom().hasText('[true] [false] [false] [false]', 'value should be "[true] [false] [false] [false]"');
  });

  test('dates', async function (assert) {
    const date = new Date(2026, 0, 1);
    const sameTime = new Date(2026, 0, 1);
    const otherTime = new Date(2026, 0, 2);

    await render(<template>[{{isEqual date sameTime}}] [{{isEqual date otherTime}}]</template>);

    assert.dom().hasText('[true] [false]');
  });

  test('other values', async function (assert) {
    const object = {};
    const otherObject = {};

    await render(
      <template>[{{isEqual 1 1}}] [{{isEqual 1 "1"}}] [{{isEqual object object}}] [{{isEqual object otherObject}}] [{{isEqual null undefined}}]</template>,
    );

    assert.dom().hasText('[true] [false] [true] [false] [false]');
  });

  test('logs no deprecation', async function (assert) {
    await render(<template>{{isEqual 1 1}}</template>);

    assert.deepEqual(getDeprecations(), []);
  });
});
