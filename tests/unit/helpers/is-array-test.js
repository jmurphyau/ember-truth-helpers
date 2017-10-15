import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('is-array', 'helper:is-array', {
  integration: true
});

test('simple test 1', function(assert) {
  const fakeContextObject = EmberObject.create({
    valueA: null,
    valueB: null
  });
  this.set('contextChild', fakeContextObject);

  this.render(
    hbs("[{{is-array contextChild.valueA}}] [{{is-array contextChild.valueB}}] [{{is-array contextChild.valueA contextChild.valueB}}]")
  );

  assert.equal(this.$().text(), '[false] [false] [false]', 'value should be "[false] [false] [false]"');

  run(fakeContextObject, 'set', 'valueA', []);
  assert.equal(this.$().text(), '[true] [false] [false]', 'value should be "[true] [false] [false]"');

  run(fakeContextObject, 'set', 'valueB', []);
  assert.equal(this.$().text(), '[true] [true] [true]', 'value should be "[true] [true] [true]"');
});
