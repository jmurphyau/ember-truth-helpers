import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { xor } from 'ember-truth-helpers';

module('helper:xor', function (hooks) {
  setupRenderingTest(hooks);

  test('boolean values', async function (assert) {
    await render(
      <template>[{{xor true true}}] [{{xor true false}}] [{{xor false true}}] [{{xor false false}}]</template>
    );

    assert
      .dom()
      .hasText(
        '[false] [true] [true] [false]',
        'value should be "[false] [true] [true] [false]"'
      );
  });
});
