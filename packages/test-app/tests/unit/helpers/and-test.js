import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('helper:and', function (hooks) {
  setupRenderingTest(hooks);

  test('boolean values', async function (assert) {
    await render(
      hbs`[{{and true true}}] [{{and true false}}] [{{and false true}}] [{{and false false}}]`
    );

    assert.equal(
      this.element.textContent,
      '[true] [false] [false] [false]',
      'value should be "[true] [false] [false] [false]"'
    );
  });

  test('integer values', async function (assert) {
    await render(hbs`[{{and 1 1}}] [{{and 1 0}}] [{{and 0 1}}] [{{and 0 0}}]`);

    assert.equal(
      this.element.textContent,
      '[1] [0] [0] [0]',
      'value should be "[1] [0] [0] [0]"'
    );
  });

  test('string values', async function (assert) {
    await render(
      hbs`[{{and " " " "}}] [{{and " " ""}}] [{{and "" " "}}] [{{and "" ""}}]`
    );

    assert.equal(
      this.element.textContent,
      '[ ] [] [] []',
      'value should be "[ ] [] [] []"'
    );
  });

  test('undefined list length and boolean', async function (assert) {
    await render(hbs`[{{and this.array.length 1}}]`);

    assert.equal(this.element.textContent, '[]', 'value should be "[]"');
  });

  test('null list length and boolean', async function (assert) {
    this.set('array', null);

    await render(hbs`[{{and this.array.length 1}}]`);

    assert.equal(this.element.textContent, '[]', 'value should be "[]"');
  });

  test('empty list length and boolean', async function (assert) {
    this.set('array', []);

    await render(hbs`[{{and this.array.length 1}}]`);

    assert.equal(this.element.textContent, '[0]', 'value should be "[0]"');
  });

  test('non-empty list length and boolean', async function (assert) {
    this.set('array', ['a']);

    await render(hbs`[{{and this.array.length 2}}]`);

    assert.equal(this.element.textContent, '[2]', 'value should be "[2]"');
  });

  test('it does short-circuit with falsey argument', async function (assert) {
    this.foo = {
      get bar() {
        assert.step('get bar');
        return false;
      },
      get baz() {
        assert.step('get baz');
        return true;
      },
    };

    await render(hbs`[{{and this.foo.bar this.foo.baz}}]`);

    assert.verifySteps(['get bar']);
    assert.dom().hasText('[false]');
  });
});
