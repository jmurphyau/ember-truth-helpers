import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('helper:is-equal', function (hooks) {
  setupRenderingTest(hooks);

  test('uses isEqual', async function (assert) {
    this.set('complex', {
      isEqual(value) {
        return 12 === value;
      },
    });

    await render(
      hbs`[{{is-equal this.complex 12}}] [{{is-equal this.complex 13}}] [{{is-equal 13 this.complex}}] [{{is-equal 12 this.complex}}]`
    );

    assert.equal(
      this.element.textContent,
      '[true] [false] [false] [false]',
      'value should be "[true] [false] [false] [false]"'
    );
  });
});
