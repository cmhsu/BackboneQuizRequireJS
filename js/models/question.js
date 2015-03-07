define(['underscore', 'backbone'], function(_, Backbone) {

	var Question = Backbone.Model.extend({
		defaults: {
			question: '',
			answer1: '',
			answer2: '',
			answer3: '',
			answer4: ''
		}
	});
	return Question;
});
