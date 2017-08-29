import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('not', 'helper:not', {
  integration: true
});

test('simple test 1', function(assert) {
  this.render(
    hbs("[{{not true}}] [{{not false}}] [{{not null}}] [{{not undefined}}] [{{not ''}}] [{{not ' '}}]")
  );

  assert.equal(this.$().text(), '[false] [true] [true] [true] [true] [false]', 'value should be "[false] [true] [true] [true] [true] [false]"');
});

test('simple test 2', function(assert) {
  this.render(
    hbs("[{{not true false}}] [{{not true false}}] [{{not null null false null}}] [{{not false null ' ' true}}]")
  );

  assert.equal(this.$().text(), '[false] [false] [true] [false]', 'value should be "[false] [false] [true] [false]"');
});
