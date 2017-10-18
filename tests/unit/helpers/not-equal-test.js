import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('not-eq', 'helper:not-equal', {
  integration: true
});

test('simple test 1', function(assert) {
  this.render(
    hbs("[{{not-eq true true}}] [{{not-eq true false}}] [{{not-eq false true}}] [{{not-eq false false}}]")
  );

  assert.equal(this.$().text(), '[false] [true] [true] [false]', 'value should be "[false] [true] [true] [false]"');
});

test('simple test 2', function(assert) {
  const fakeContextObject = EmberObject.create({
    valueA: null,
    valueB: null
  });

  this.set('contextChild', fakeContextObject);

  this.render(
    hbs("[{{not-eq contextChild.valueA contextChild.valueB}}] [{{not-eq contextChild.valueB contextChild.valueA}}]")
  );

  assert.equal(this.$().text(), '[false] [false]', 'value should be "[false] [false]"');

  run(fakeContextObject, 'set', 'valueA', undefined);
  assert.equal(this.$().text(), '[true] [true]', 'value should be "[true] [true]"');

  run(fakeContextObject, 'set', 'valueB', undefined);
  assert.equal(this.$().text(), '[false] [false]', 'value should be "[false] [false]"');

  run(fakeContextObject, 'set', 'valueA', 'yellow');
  run(fakeContextObject, 'set', 'valueB', 'yellow');
  assert.equal(this.$().text(), '[false] [false]', 'value should be "[false] [false]"');

});
