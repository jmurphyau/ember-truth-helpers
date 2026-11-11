import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { getDeprecations, render } from '@ember/test-helpers';
import { isEmpty } from '#src/index.ts';

module('helper:isEmpty', function (hooks) {
  setupRenderingTest(hooks);

  test('undefined/null values', async function (assert) {
    const thisIsUndefined = undefined;
    const thisIsNull = null;
    const thisIsNotNull = new Date();

    await render(<template>[{{isEmpty thisIsUndefined}}] [{{isEmpty thisIsNull}}] [{{isEmpty thisIsNotNull}}]</template>);

    assert.dom().hasText('[true] [true] [false]', 'value should be "[true] [true] [false]"');
  });

  test('boolean values', async function (assert) {
    await render(<template>[{{isEmpty true}}] [{{isEmpty false}}]</template>);

    assert.dom().hasText('[false] [false]', 'value should be "[false] [false]"');
  });

  test('objects', async function (assert) {
    const emptyObject = {};
    const notEmptyObject = { some: 'object' };

    await render(<template>[{{isEmpty emptyObject}}] [{{isEmpty notEmptyObject}}]</template>);

    assert.dom().hasText('[false] [false]', 'value should be "[false] [false]"');
  });

  test('arrays', async function (assert) {
    const emptyArray: unknown[] = [];
    const notEmptyArray = ['a', 8, {}];

    await render(<template>[{{isEmpty emptyArray}}] [{{isEmpty notEmptyArray}}]</template>);

    assert.dom().hasText('[true] [false]', 'value should be "[true] [false]"');
  });

  test('strings', async function (assert) {
    const emptyString = '';
    const whitespaceString = '   ';
    const notEmptyString = 'full of text';

    await render(<template>[{{isEmpty emptyString}}] [{{isEmpty whitespaceString}}] [{{isEmpty notEmptyString}}]</template>);

    assert.dom().hasText('[true] [false] [false]', 'value should be "[true] [false] [false]"');
  });

  test('maps and sets', async function (assert) {
    const emptyMap = new Map();
    const notEmptyMap = new Map([['a', 1]]);
    const emptySet = new Set();
    const notEmptySet = new Set([1]);

    await render(
      <template>[{{isEmpty emptyMap}}] [{{isEmpty notEmptyMap}}] [{{isEmpty emptySet}}] [{{isEmpty notEmptySet}}]</template>,
    );

    assert.dom().hasText('[true] [false] [true] [false]');
  });

  test('objects with size or length', async function (assert) {
    const zeroSize = { size: 0 };
    const someSize = { size: 2 };
    const zeroLength = { length: 0 };
    const someLength = { length: 2 };

    await render(
      <template>[{{isEmpty zeroSize}}] [{{isEmpty someSize}}] [{{isEmpty zeroLength}}] [{{isEmpty someLength}}]</template>,
    );

    assert.dom().hasText('[true] [false] [true] [false]');
  });

  test('numbers and functions', async function (assert) {
    const zero = 0;
    const noArguments = () => {};

    await render(<template>[{{isEmpty zero}}] [{{isEmpty noArguments}}]</template>);

    assert.dom().hasText('[false] [false]');
  });

  test('logs no deprecation', async function (assert) {
    await render(<template>{{isEmpty ""}}</template>);

    assert.deepEqual(getDeprecations(), []);
  });

  test('reads through unknownProperty like get()', async function (assert) {
    class UnknownLength extends EmberObject {
      unknownProperty(key: string) {
        return key === 'length' ? 0 : undefined;
      }
    }
    const emptyThroughUnknownProperty = UnknownLength.create();

    await render(<template>[{{isEmpty emptyThroughUnknownProperty}}]</template>);

    assert.dom().hasText('[true]');
  });
});
