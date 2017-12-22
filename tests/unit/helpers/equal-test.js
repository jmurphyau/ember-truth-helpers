import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('eq', 'helper:eq', {
  integration: true
});

test('simple test 1', function(assert) {
  this.render(
    hbs("[{{eq true true}}] [{{eq true false}}] [{{eq false true}}] [{{eq false false}}]")
  );

  assert.equal(this.$().text(), '[true] [false] [false] [true]', 'value should be "[true] [false] [false] [true]"');
});

test('simple test 2', function(assert) {
  const fakeContextObject = EmberObject.create({
    valueA: null,
    valueB: null
  });

  this.set('contextChild', fakeContextObject);

  this.render(
    hbs("[{{eq contextChild.valueA contextChild.valueB}}] [{{eq contextChild.valueB contextChild.valueA}}]")
  );

  assert.equal(this.$().text(), '[true] [true]', 'value should be "[true] [true]"');

  run(fakeContextObject, 'set', 'valueA', undefined);
  assert.equal(this.$().text(), '[false] [false]', 'value should be "[false] [false]"');

  run(fakeContextObject, 'set', 'valueB', undefined);
  assert.equal(this.$().text(), '[true] [true]', 'value should be "[true] [true]"');

  run(fakeContextObject, 'set', 'valueA', 'yellow');
  run(fakeContextObject, 'set', 'valueB', 'yellow');
  assert.equal(this.$().text(), '[true] [true]', 'value should be "[true] [true]"');

});

test('variable argument count', function(assert) {
  const fakeContextObject = EmberObject.create({
    valueA: null,
    valueB: null,
    valueC: null
  });

  this.set('contextChild', fakeContextObject);

  this.render(
    hbs(
      '[{{eq contextChild.valueA contextChild.valueB contextChild.valueC}}] [{{eq contextChild.valueA contextChild.valueC contextChild.valueB}}] [{{eq contextChild.valueC contextChild.valueB contextChild.valueA}}]'
    )
  );

  assert.equal(
    this.$().text(),
    '[true] [true] [true]',
    'value should be "[true] [true] [true]"'
  );

  run(fakeContextObject, 'set', 'valueA', undefined);
  assert.equal(
    this.$().text(),
    '[false] [false] [false]',
    'value should be "[false] [false] [false]"'
  );

  run(fakeContextObject, 'set', 'valueB', undefined);
  run(fakeContextObject, 'set', 'valueC', undefined);
  assert.equal(
    this.$().text(),
    '[true] [true] [true]',
    'value should be "[true] [true] [true]"'
  );

  run(fakeContextObject, 'set', 'valueA', 'yellow');
  run(fakeContextObject, 'set', 'valueB', 'yellow');
  run(fakeContextObject, 'set', 'valueC', 'yellow');
  assert.equal(
    this.$().text(),
    '[true] [true] [true]',
    'value should be "[true] [true] [true]"'
  );
});
