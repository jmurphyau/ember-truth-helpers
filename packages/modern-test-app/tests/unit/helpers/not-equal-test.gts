import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { notEq } from 'ember-truth-helpers';

module('helper:notEqual', function (hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function (assert) {
    await render(
      <template>[{{notEq true true}}] [{{notEq true false}}] [{{notEq false true}}] [{{notEq false false}}]</template>
    );

    assert
      .dom()
      .hasText(
        '[false] [true] [true] [false]',
        'value should be "[false] [true] [true] [false]"'
      );
  });

  test('simple test 2', async function (assert) {
    const fakeContextObject = EmberObject.create({
      // @ts-ignore
      valueA: null,
      valueB: null,
    });

    const contextChild = fakeContextObject;

    await render(
      <template>
        {{!@glint-expect-error}}
        [{{notEq contextChild.valueA contextChild.valueB}}] [{{notEq contextChild.valueB contextChild.valueA}}]
      </template>
    );

    assert
      .dom()
      .hasText('[false] [false]', 'value should be "[false] [false]"');

    run(fakeContextObject, 'set', 'valueA', undefined);
    assert.dom().hasText('[true] [true]', 'value should be "[true] [true]"');

    run(fakeContextObject, 'set', 'valueB', undefined);
    assert
      .dom()
      .hasText('[false] [false]', 'value should be "[false] [false]"');

    run(fakeContextObject, 'set', 'valueA', 'yellow');
    run(fakeContextObject, 'set', 'valueB', 'yellow');
    assert
      .dom()
      .hasText('[false] [false]', 'value should be "[false] [false]"');
  });
});
