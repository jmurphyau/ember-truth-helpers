import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('is-equal', 'helper:is-equal', {
  integration: true
});

test('uses isEqual', function(assert) {
  this.set('complex', {
    isEqual(value) {
      return 12 === value;
    }
  });

  this.render(
    hbs("[{{is-equal complex 12}}] [{{is-equal complex 13}}] [{{is-equal 13 complex}}] [{{is-equal 12 complex}}]")
  );

  assert.equal(this.$().text(), '[true] [false] [false] [false]', 'value should be "[true] [false] [false] [false]"');
});
