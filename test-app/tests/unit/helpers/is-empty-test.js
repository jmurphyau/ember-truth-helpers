import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('helper:is-empty', function (hooks) {
  setupRenderingTest(hooks);

  test('undefined/null values', async function (assert) {
    this.set('thisIsUndefined', undefined);
    this.set('thisIsNull', null);
    this.set('thisIsNotNull', new Date());
    await render(
      hbs`[{{is-empty this.thisIsUndefined}}] [{{is-empty this.thisIsNull}}] [{{is-empty this.thisIsNotNull}}]`
    );

    assert.equal(
      this.element.textContent,
      '[true] [true] [false]',
      'value should be "[true] [true] [false]"'
    );
  });

  test('boolean values', async function (assert) {
    await render(hbs`[{{is-empty true}}] [{{is-empty false}}]`);

    assert.equal(
      this.element.textContent,
      '[false] [false]',
      'value should be "[false] [false]"'
    );
  });

  test('objects', async function (assert) {
    this.set('emptyObject', {});
    this.set('notEmptyObject', { some: 'object' });
    await render(
      hbs`[{{is-empty this.emptyObject}}] [{{is-empty this.notEmptyObject}}]`
    );

    assert.equal(
      this.element.textContent,
      '[false] [false]',
      'value should be "[false] [false]"'
    );
  });

  test('arrays', async function (assert) {
    this.set('emptyArray', []);
    this.set('notEmptyArray', ['a', 8, {}]);
    await render(
      hbs`[{{is-empty this.emptyArray}}] [{{is-empty this.notEmptyArray}}]`
    );

    assert.equal(
      this.element.textContent,
      '[true] [false]',
      'value should be "[true] [false]"'
    );
  });

  test('strings', async function (assert) {
    this.set('emptyString', '');
    this.set('whitespaceString', '   ');
    this.set('notEmptyString', 'full of text');
    await render(
      hbs`[{{is-empty this.emptyString}}] [{{is-empty this.whitespaceString}}] [{{is-empty this.notEmptyString}}]`
    );

    assert.equal(
      this.element.textContent,
      '[true] [false] [false]',
      'value should be "[true] [false] [false]"'
    );
  });
});
