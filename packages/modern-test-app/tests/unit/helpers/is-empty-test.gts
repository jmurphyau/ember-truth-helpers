import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { isEmpty } from 'ember-truth-helpers';

module('helper:isEmpty', function (hooks) {
  setupRenderingTest(hooks);

  test('undefined/null values', async function (assert) {
    const thisIsUndefined = undefined;
    const thisIsNull =  null;
    const thisIsNotNull = new Date();

    await render(
      <template>[{{isEmpty thisIsUndefined}}] [{{isEmpty thisIsNull}}] [{{isEmpty thisIsNotNull}}]</template>
    );

    assert.dom().hasText(
      '[true] [true] [false]',
      'value should be "[true] [true] [false]"'
    );
  });

  test('boolean values', async function (assert) {
    await render(<template>[{{isEmpty true}}] [{{isEmpty false}}]</template>);

    assert.dom().hasText(
      '[false] [false]',
      'value should be "[false] [false]"'
    );
  });

  test('objects', async function (assert) {
    const emptyObject = {};
    const notEmptyObject = { some: 'object' };

    await render(
      <template>[{{isEmpty emptyObject}}] [{{isEmpty notEmptyObject}}]</template>
    );

    assert.dom().hasText(
      '[false] [false]',
      'value should be "[false] [false]"'
    );
  });

  test('arrays', async function (assert) {
    const emptyArray: unknown[] = [];
    const notEmptyArray = ['a', 8, {}];

    await render(
      <template>[{{isEmpty emptyArray}}] [{{isEmpty notEmptyArray}}]</template>
    );

    assert.dom().hasText(
      '[true] [false]',
      'value should be "[true] [false]"'
    );
  });

  test('strings', async function (assert) {
    const emptyString = '';
    const whitespaceString = '   ';
    const notEmptyString = 'full of text';

    await render(
      <template>[{{isEmpty emptyString}}] [{{isEmpty whitespaceString}}] [{{isEmpty notEmptyString}}]</template>
    );

    assert.dom().hasText(
      '[true] [false] [false]',
      'value should be "[true] [false] [false]"'
    );
  });
});
