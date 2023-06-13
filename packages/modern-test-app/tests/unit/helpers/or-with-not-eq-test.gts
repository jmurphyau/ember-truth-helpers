import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { or, notEq } from 'ember-truth-helpers';

module('helper:or with notEq', function (hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function (assert) {
    await render(<template>[{{or (notEq true false) (notEq true false)}}]</template>);

    assert.dom().hasText('[true]', 'value should be "[true]"');
  });

  test('simple test 2', async function (assert) {
    await render(<template>[{{or (notEq true true) (notEq false false)}}]</template>);

    assert.dom().hasText('[false]', 'value should be "[true]"');
  });

  test('simple test 3', async function (assert) {
    await render(<template>[{{or (notEq true true) (notEq true false)}}]</template>);

    assert.dom().hasText('[true]', 'value should be "[true]"');
  });

  test('simple test 4', async function (assert) {
    await render(<template>[{{or (notEq true false) (notEq false false)}}]</template>);

    assert.dom().hasText('[true]', 'value should be "[true]"');
  });

  test('simple test 5', async function (assert) {
    await render(
      <template>[{{#if (or (notEq true false) (notEq false false))}}true{{else}}false{{/if}}]</template>
    );

    assert.dom().hasText('[true]', 'value should be "[true]"');
  });
});
