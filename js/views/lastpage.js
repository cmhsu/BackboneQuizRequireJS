define(['jquery', 'underscore', 'backbone', 'text!templates/lastpage.html'], function($, _, Backbone, lastPageTemplate) {

	var LastPageView = Backbone.View.extend({
		el: '#last-page',

		events: {
			'click #play-again': 'playAgain'
		},

		template: _.template(lastPageTemplate),

		initialize: function () {
			$('#question-display').html('');
			this.listenTo(EventBus, 'changequiz', this.hideView);
		},

		render: function () {
			this.$el.html(this.template(this.model.attributes));
			return this;
		},

		playAgain: function () {
			restart();
			var quizNumber = question / 5;
			setActiveNav(quizNumber);
			question -= 4;
			this.$el.html('');
			EventBus.trigger('changequiz');
			this.model.remove();
		},

		hideView: function () {
			this.$el.html('');
		}

	});
	return LastPageView;
});
