var cards = {
	init: function init(){
		$('.outer-card-wrapper .card').each(function(){
			var card = $(this);
			var triggers = card.find('.card-trigger');

			triggers.attr({
				'role': 'button',
				'tabindex': '0',
				'aria-pressed': 'false'
			});

			triggers.on('click', function(){
				cards.toggle(card, triggers);
			});
		});
	},
	toggle: function toggle(card, triggers){
		var isFlipped = card.toggleClass('is-flipped').hasClass('is-flipped');
		triggers.attr('aria-pressed', isFlipped ? 'true' : 'false');
	}
};
