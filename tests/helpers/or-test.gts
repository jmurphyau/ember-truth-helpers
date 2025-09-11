import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { or } from '#src/index.ts';

module('helper:or', function (hooks) {
  setupRenderingTest(hooks);

  test('simple test 1', async function (assert) {
    await render(<template>[{{or true 1 " " null undefined}}]</template>);

    assert.dom().hasText('[true]', 'value should be "[true]"');
  });

  test('simple test 2', async function (assert) {
    await render(<template>[{{or null undefined true 1 " "}}]</template>);

    assert.dom().hasText('[true]', 'value should be "[true]"');
  });

  test('simple test 3', async function (assert) {
    await render(
      <template>
        [{{or false}}] [{{or true}}] [{{or 1}}] [{{or ""}}] [{{or false ""}}] [{{or true ""}}] [{{or "" true}}]
      </template>,
    );

    assert.dom().hasText('[false] [true] [1] [] [] [true] [true]', 'value should be "[false] [true] [1] [] [] [true] [true]"');
  });

  test('simple test 4', async function (assert) {
    const fakeContextObject = EmberObject.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      valueA: null,
      valueB: null,
    });

    const contextChild = fakeContextObject;

    await render(
      <template>
        {{!@glint-expect-error}}
        [{{or contextChild.valueA}}] [{{or contextChild.valueB}}]
        {{!@glint-expect-error}}
        [{{or contextChild.valueB contextChild.valueA}}] [{{or contextChild.valueA contextChild.valueB}}]
      </template>,
    );

    assert.dom().hasText('[] [] [] []', 'value should be "[] [] [] []"');

    fakeContextObject.set('valueA', undefined);
    await settled();
    assert.dom().hasText('[] [] [] []', 'value should be "[] [] [] []"');

    fakeContextObject.set('valueA', '');
    await settled();
    assert.dom().hasText('[] [] [] []', 'value should be "[] [] [] []"');

    fakeContextObject.set('valueA', ' ');
    await settled();
    assert.dom().hasText('[ ] [] [ ] [ ]', 'value should be "[ ] [] [ ] [ ]"');

    fakeContextObject.set('valueB', 'yellow');
    await settled();
    assert.dom().hasText('[ ] [yellow] [yellow] [ ]', 'value should be "[ ] [yellow] [yellow] [ ]"');
  });

  test('it does short-circuit with truthy argument', async function (assert) {
    const foo = {
      get bar() {
        assert.step('get bar');
        return true;
      },
      get baz() {
        assert.step('get baz');
        return false;
      },
    };

    await render(<template>[{{or foo.bar foo.baz}}]</template>);

    assert.verifySteps(['get bar']);
    assert.dom().hasText('[true]');
  });
});
