define(['underscore', 'backbone', 'models/question'], function(_, Backbone, Question) {

	var Questions = Backbone.Collection.extend({
		model: Question

	});
	return Questions;
});


