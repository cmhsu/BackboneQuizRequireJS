define(['jquery', 'underscore', 'backbone', 'text!templates/question.html'], function($, _, Backbone, questionTemplate) {

	var QuestionView = Backbone.View.extend({
		tagName: 'div',
		className: 'questionContainer',
		template: _.template(questionTemplate),

		render: function () {
			this.$el.html(this.template(this.model.attributes));
			return this;
		}
	});
	return QuestionView;
});
