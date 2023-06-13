import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { not } from 'ember-truth-helpers';

module('helper:not', function (hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function (assert) {
    await render(
      <template>[{{not true}}] [{{not false}}] [{{not null}}] [{{not undefined}}] [{{not ''}}] [{{not ' '}}]</template>
    );

    assert
      .dom()
      .hasText(
        '[false] [true] [true] [true] [true] [false]',
        'value should be "[false] [true] [true] [true] [true] [false]"'
      );
  });

  test('simple test 2', async function (assert) {
    await render(
      <template>[{{not true false}}] [{{not true false}}] [{{not null null false null}}] [{{not false null ' ' true}}]</template>
    );

    assert
      .dom()
      .hasText(
        '[false] [false] [true] [false]',
        'value should be "[false] [false] [true] [false]"'
      );
  });
});
