import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { and } from 'ember-truth-helpers';

module('helper:and', function (hooks) {
  setupRenderingTest(hooks);

  test('boolean values', async function (assert) {
    await render(
      <template>[{{and true true}}] [{{and true false}}] [{{and false true}}] [{{and false false}}]</template>
    );

    assert.dom().hasText(
      '[true] [false] [false] [false]',
      'value should be "[true] [false] [false] [false]"'
    );
  });

  test('integer values', async function (assert) {
    await render(<template>[{{and 1 1}}] [{{and 1 0}}] [{{and 0 1}}] [{{and 0 0}}]</template>);

    assert.dom().hasText(
      '[1] [0] [0] [0]',
      'value should be "[1] [0] [0] [0]"'
    );
  });

  test('string values', async function (assert) {
    await render(
      <template>[{{and " " " "}}] [{{and " " ""}}] [{{and "" " "}}] [{{and "" ""}}]</template>
    );

    assert.dom().hasText(
      '[ ] [] [] []',
      'value should be "[ ] [] [] []"'
    );
  });

  test('null list length and boolean', async function (assert) {
    const array = null;

    // @glint-expect-error
    await render(<template>[{{and array.length 1}}]</template>);

    assert.dom().hasText('[]', 'value should be "[]"');
  });

  test('empty list length and boolean', async function (assert) {
    const array = [];

    await render(<template>[{{and array.length 1}}]</template>);

    assert.dom().hasText('[0]', 'value should be "[0]"');
  });

  test('non-empty list length and boolean', async function (assert) {
    const array = ['a'];

    await render(<template>[{{and array.length 2}}]</template>);

    assert.dom().hasText('[2]', 'value should be "[2]"');
  });
});
