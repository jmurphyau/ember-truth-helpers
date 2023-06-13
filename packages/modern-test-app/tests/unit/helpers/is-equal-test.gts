import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { isEqual } from 'ember-truth-helpers';

module('helper:isEqual', function (hooks) {
  setupRenderingTest(hooks);

  test('uses isEqual', async function (assert) {
    const complex = {
      isEqual(value: unknown) {
        return 12 === value;
      },
    };

    await render(
      <template>[{{isEqual complex 12}}] [{{isEqual complex 13}}] [{{isEqual 13 complex}}] [{{isEqual 12 complex}}]</template>
    );

    assert.dom().hasText(
      '[true] [false] [false] [false]',
      'value should be "[true] [false] [false] [false]"'
    );
  });
});
