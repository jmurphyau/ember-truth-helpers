import Ember from 'ember';

export function registerHelper(name, helperFunction) {
	if (Ember.HTMLBars._registerHelper) {
		Ember.HTMLBars.helpers[name] = Ember.HTMLBars.makeBoundHelper(helperFunction);
	} else if (Ember.HTMLBars.registerHelper) {
		Ember.HTMLBars.registerHelper(name, Ember.HTMLBars.makeBoundHelper(helperFunction));
	}
}