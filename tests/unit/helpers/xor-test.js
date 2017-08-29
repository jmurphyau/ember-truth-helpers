import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('xor', 'helper:xor', {
  integration: true
});

test('boolean values', function(assert) {
  this.render(
    hbs("[{{xor true true}}] [{{xor true false}}] [{{xor false true}}] [{{xor false false}}]")
  );

  assert.equal(this.$().text(), '[false] [true] [true] [false]', 'value should be "[false] [true] [true] [false]"');
});
