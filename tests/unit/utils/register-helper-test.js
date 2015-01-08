
import Ember from 'ember';
import {
	registerHelper
} from 'ember-truth-helpers/utils/register-helper';

module('RegisterHelper');

test('simple test 1', function() {
	registerHelper('display-value', function(params) { return params[0]; });

	var fakeContextObject = Ember.Object.create({
		valueA: null,
		valueB: null
	});

	var view = Ember.View.create({
		context: {
			contextChild: fakeContextObject
		},
		template: Ember.HTMLBars.compile("[{{display-value null}}] [{{display-value false}}] [{{display-value contextChild.valueA}}] [{{display-value contextChild.valueB}}]"),
	});

	Ember.run(view, 'appendTo', '#ember-testing');

	equal(view.$().text(), '[] [false] [] []', 'value should be "[] [false] [] []"');

	Ember.run(fakeContextObject, 'set', 'valueA', undefined);
	equal(view.$().text(), '[] [false] [] []', 'value should be "[] [false] [] []"');

	Ember.run(fakeContextObject, 'set', 'valueB', undefined);
	equal(view.$().text(), '[] [false] [] []', 'value should be "[] [false] [] []"');

	Ember.run(fakeContextObject, 'set', 'valueA', 'yellow');
	equal(view.$().text(), '[] [false] [yellow] []', 'value should be "[] [false] [yellow] []"');
	
	Ember.run(fakeContextObject, 'set', 'valueA', 'blue');
	Ember.run(fakeContextObject, 'set', 'valueB', 'green');
	equal(view.$().text(), '[] [false] [blue] [green]', 'value should be "[] [false] [blue] [green]"');

});