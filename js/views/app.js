define(['jquery', 'underscore', 'backbone', 'views/greeting', 'views/question',
	'views/lastpage', 'views/nav', 'collections/questions', 'models/question' ],
	function($, _, Backbone, GreetingView, QuestionView, LastPageView, NavView, Questions, Question) {

		var AppView = Backbone.View.extend({
			el: '#question-display',

			events: {
				'click #next': 'showNextQuestion',
				'click #back': 'showPrevQuestion',
				'click #submit': 'showLastPage'
			},

			initialize: function (allQuestions) {
				new GreetingView();
				this.collection = new Questions(allQuestions);
				this.listenTo(EventBus, 'startover', this.render);
				this.listenTo(EventBus, 'changequiz', this.render);
				this.render();
			},

			render: function () {
				this.model = this.collection.get(question);
				var questionView = new QuestionView({model: this.model});
				this.$el.html(questionView.render().el);
				if (selected[question] > -1) {
					var selectedAnswer = selected[question];
					var prevSelected = $('input[name="choices"]').get(selectedAnswer);
					$(prevSelected).prop('checked', true);
				}
			},

			validateAnswer: function () {
				var checkedInput = $('input[name="choices"]:checked');
				if (checkedInput[0] == null) {
					$('#please-select').removeClass('display-none').addClass('display-block');
					return false;
				}
				selected[question] = +checkedInput.val();
				if (+checkedInput.val() == +this.model.get('correctAnswer')) {
					wasAnswerCorrect[question] = true;
					correctAnswerCount += 1;
				}
			},

			showNextQuestion: function () {
				if (this.validateAnswer() === false) {
					return;
				}
				else {
					question += 1;
					this.render();
				}
			},

			showPrevQuestion: function () {
				if (wasAnswerCorrect[question - 1] === true) {
					correctAnswerCount -= 1;
					wasAnswerCorrect[question - 1] = false;
				}
				var checkedInput = $('input[name="choices"]:checked');
				if (checkedInput[0] != null) {
					selected[question] = +checkedInput.val();
				}
				question -= 1;
				this.render();

			},

			showLastPage: function () {
				if (this.validateAnswer() === false) {
					return
				}
				else {
					this.model.set({score: correctAnswerCount});
					var lastPageView = new LastPageView({model: this.model});
					return lastPageView.render().el;
				}
			}

		});

		return AppView;
	});
