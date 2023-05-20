import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { gte } from 'ember-truth-helpers';

module('helper:gte', function (hooks) {
  setupRenderingTest(hooks);

  test('boolean values', async function (assert) {
    await render(
      <template>[{{gte true true}}] [{{gte true false}}] [{{gte false true}}] [{{gte false false}}]</template>
    );

    assert.dom().hasText(
      '[true] [true] [false] [true]',
      'value should be "[false] [true] [false] [true]"'
    );
  });

  test('integer values', async function (assert) {
    await render(<template>[{{gte 1 1}}] [{{gte 1 0}}] [{{gte 0 1}}] [{{gte 0 0}}]</template>);

    assert.dom().hasText(
      '[true] [true] [false] [true]',
      'value should be "[true] [true] [false] [true]"'
    );
  });

  test('decimal values', async function (assert) {
    await render(
      <template>[{{gte 19.2 19.2}}] [{{gte 19.2 3.55}}] [{{gte 3.55 19.2}}] [{{gte 3.55 3.55}}]</template>
    );

    assert.dom().hasText(
      '[true] [true] [false] [true]',
      'value should be "[true] [true] [false] [true]"'
    );
  });

  test('integers in strings 1', async function (assert) {
    await render(
      <template>[{{gte '1' '1' forceNumber=true}}] [{{gte '1' '0' forceNumber=true}}] [{{gte '0' '1' forceNumber=true}}] [{{gte '0' '0' forceNumber=true}}]</template>
    );

    assert.dom().hasText(
      '[true] [true] [false] [true]',
      'value should be "[true] [true] [false] [true]"'
    );
  });

  test('integers in strings 2', async function (assert) {
    await render(
      <template>[{{gte '102' '102' forceNumber=true}}] [{{gte '102' '98' forceNumber=true}}] [{{gte '98' '102' forceNumber=true}}] [{{gte '98' '98' forceNumber=true}}]</template>
    );

    assert.dom().hasText(
      '[true] [true] [false] [true]',
      'value should be "[true] [true] [false] [true]"'
    );
  });

  test('decimals in strings', async function (assert) {
    await render(
      <template>[{{gte '19.2' '19.2' forceNumber=true}}] [{{gte '19.2' '3.55' forceNumber=true}}] [{{gte '3.55' '19.2' forceNumber=true}}] [{{gte '3.55' '3.55' forceNumber=true}}]</template>
    );

    assert.dom().hasText(
      '[true] [true] [false] [true]',
      'value should be "[true] [true] [false] [true]"'
    );
  });
});
