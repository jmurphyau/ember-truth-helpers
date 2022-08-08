import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('helper:lt', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('boolean values', async function (assert) {
    await render(
      hbs`[{{lt true true}}] [{{lt true false}}] [{{lt false true}}] [{{lt false false}}]`
    );

    assert.equal(
      this.element.textContent,
      '[false] [false] [true] [false]',
      'value should be "[false] [false] [true] [false]"'
    );
  });

  test('integer values', async function (assert) {
    await render(hbs`[{{lt 1 1}}] [{{lt 1 0}}] [{{lt 0 1}}] [{{lt 0 0}}]`);

    assert.equal(
      this.element.textContent,
      '[false] [false] [true] [false]',
      'value should be "[false] [false] [true] [false]"'
    );
  });

  test('decimal values', async function (assert) {
    await render(
      hbs`[{{lt 19.2 19.2}}] [{{lt 19.2 3.55}}] [{{lt 3.55 19.2}}] [{{lt 3.55 3.55}}]`
    );

    assert.equal(
      this.element.textContent,
      '[false] [false] [true] [false]',
      'value should be "[false] [false] [true] [false]"'
    );
  });

  test('integers in strings 1', async function (assert) {
    await render(
      hbs`[{{lt '1' '1' forceNumber=true}}] [{{lt '1' '0' forceNumber=true}}] [{{lt '0' '1' forceNumber=true}}] [{{lt '0' '0' forceNumber=true}}]`
    );

    assert.equal(
      this.element.textContent,
      '[false] [false] [true] [false]',
      'value should be "[false] [false] [true] [false]"'
    );
  });

  test('integers in strings 2', async function (assert) {
    await render(
      hbs`[{{lt '102' '102' forceNumber=true}}] [{{lt '102' '98' forceNumber=true}}] [{{lt '98' '102' forceNumber=true}}] [{{lt '98' '98' forceNumber=true}}]`
    );

    assert.equal(
      this.element.textContent,
      '[false] [false] [true] [false]',
      'value should be "[false] [false] [true] [false]"'
    );
  });

  test('decimals in strings', async function (assert) {
    await render(
      hbs`[{{lt '19.2' '19.2' forceNumber=true}}] [{{lt '19.2' '3.55' forceNumber=true}}] [{{lt '3.55' '19.2' forceNumber=true}}] [{{lt '3.55' '3.55' forceNumber=true}}]`
    );

    assert.equal(
      this.element.textContent,
      '[false] [false] [true] [false]',
      'value should be "[false] [false] [true] [false]"'
    );
  });
});
