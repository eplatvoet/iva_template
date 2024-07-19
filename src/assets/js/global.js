var global = {
	init: function init(){
		// Let's keep it strict
		'use strict';
		global.cE();
		global.eL();
	},
	cE: function cE(){
		global.navLinks     = $('.nav-link');
		global.slideLinks   = {
			'pg1': 'playground1.zip',
			'pg2': 'playground2.zip',
			'pg3': 'playground3.zip',
			'pg4': 'playground4.zip',
			'pg5': 'playground5.zip',
			'pg6': 'playground6.zip',
			'pg7': 'playground7.zip',
			'pg8': 'playground8.zip',
			'pg9': 'playground9.zip',
			'pg10': 'playground10.zip',
			'pg11': 'playground11.zip',
			'pg12': 'playground12.zip',
			'pg13': 'playground13.zip',
			'pg14': 'playground14.zip',
		};
	},
	eL: function eL(){

		$('.scroll').on("touchmove", function(event) {
			event.stopPropagation();
		});

		/*
		 * Navigation Links
		 */
		$.each(global.navLinks, function(i){
			$(global.navLinks[i]).on('click', function(e){
				e.preventDefault();
				var slide = $(this).data('slide');
				com.veeva.clm.gotoSlide(global.slideLinks[slide], 'THIS_IVA');
				console.log('clicked to go to slide '+global.slideLinks[slide]);
			});
		});
	}
};
