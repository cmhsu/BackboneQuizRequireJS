define(['jquery', 'underscore', 'backbone', 'text!templates/navbar.html'], function($, _, Backbone, navTemplate) {

	var NavView = Backbone.View.extend({
		el: '#navbar-display',

		template: _.template(navTemplate),

		events: {
			'click .nav': 'setActive'
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.html(this.template());
		},

		setActive: function (event) {
			$('.nav li').removeClass('active');
			$(event.target).parent().addClass('active');
		}

	});
	return NavView;
});
