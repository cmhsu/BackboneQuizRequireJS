require.config({
	paths: {
		jquery: 'lib/jquery-1.11.1.min',
		underscore: 'lib/underscore-min',
		backbone: 'lib/backbone-min',
		text: 'text'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		}
	}

});

require(['jquery', 'underscore', 'backbone', 'views/app', 'views/nav',
		'views/greeting', 'views/lastpage', 'views/question',
		'collections/questions', 'models/question', 'routers/router'],
	function ($, _, Backbone, AppView, NavView, GreetingView, LastPageView,
			  QuestionView, Questions, Question, Workspace) {

		getQuestions();

		_.extend(EventBus, Backbone.Events);

		var nav_view = new NavView();

		var app_view = new AppView(allQuestions);

		QuizRouter = new Workspace();

		Backbone.history.start();

		$('#greeting1, #changeUser').hide();  //Cookie and Local Storage config code starts here

		if (CookieUtil.get('name')) {
			username = CookieUtil.get('name');
			$('#greeting1').show().html("Welcome " + username);
			$('#changeUser').show();
			$('#submitNameWrap').hide();
		}

		$('#submitName').on('click', function () {
			username = $('input[name="login"]').val() || 'Anonymous User';
			CookieUtil.set('name', username);
			localStorage.setItem('user', username);
			$('#submitNameWrap').hide();
			$('#greeting1').show().html("Welcome " + username);
			$('#changeUser').show();

		});

		$('#changeUser').on('click', function () {
			username = null;
			CookieUtil.unset('name', null);
			location.reload();
		})

	});
