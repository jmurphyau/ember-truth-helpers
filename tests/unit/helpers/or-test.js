import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('or', 'helper:or', {
  integration: true
});

test('simple test 1', function(assert) {
  this.render(
    hbs("[{{or true 1 ' ' null undefined}}]")
  );

  assert.equal(this.$().text(), '[true]', 'value should be "[true]"');
});

test('simple test 2', function(assert) {
  this.render(
    hbs("[{{or null undefined true 1 ' '}}]")
  );

  assert.equal(this.$().text(), '[true]', 'value should be "[true]"');
});


test('simple test 3', function(assert) {
  this.render(
    hbs("[{{or false}}] [{{or true}}] [{{or 1}}] [{{or ''}}] [{{or false ''}}] [{{or true ''}}] [{{or '' true}}]")
  );

  assert.equal(this.$().text(), '[false] [true] [1] [] [] [true] [true]', 'value should be "[false] [true] [1] [] [] [true] [true]"');
});

test('simple test 4', function(assert) {
  var fakeContextObject = EmberObject.create({
    valueA: null,
    valueB: null
  });

  this.set('contextChild', fakeContextObject);

  this.render(
    hbs("[{{or contextChild.valueA}}] [{{or contextChild.valueB}}] [{{or contextChild.valueB contextChild.valueA}}] [{{or contextChild.valueA contextChild.valueB}}]")
  );

  assert.equal(this.$().text(), '[] [] [] []', 'value should be "[] [] [] []"');

  run(fakeContextObject, 'set', 'valueA', undefined);
  assert.equal(this.$().text(), '[] [] [] []', 'value should be "[] [] [] []"');

  run(fakeContextObject, 'set', 'valueA', '');
  assert.equal(this.$().text(), '[] [] [] []', 'value should be "[] [] [] []"');

  run(fakeContextObject, 'set', 'valueA', ' ');
  assert.equal(this.$().text(), '[ ] [] [ ] [ ]', 'value should be "[ ] [] [ ] [ ]"');

  run(fakeContextObject, 'set', 'valueB', 'yellow');
  assert.equal(this.$().text(), '[ ] [yellow] [yellow] [ ]', 'value should be "[ ] [yellow] [yellow] [ ]"');

});
