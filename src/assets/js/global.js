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
			'playground1': 'playground1.zip',
			'playground2': 'playground2.zip',
			'playground3': 'playground3.zip',
			'playground4': 'playground4.zip',
			'playground5': 'playground5.zip',
			'playground6': 'playground6.zip',
			'playground7': 'playground7.zip',
			'playground8': 'playground8.zip',
			'playground9': 'playground9.zip',
			'playground10': 'playground10.zip',
			'playground11': 'playground11.zip',
			'playground12': 'playground12.zip',
			'playground13': 'playground13.zip',
			'playground14': 'playground14.zip',
			'playground15': 'playground15.zip',
			'playground16': 'playground16.zip',
			'pdf-library-1': 'pdf-library-1.zip',
			'pdf-library-2': 'pdf-library-2.zip',
			'pdf-library-3': 'pdf-library-3.zip',
			'pdf-library-4': 'pdf-library-4.zip',
			'pdf-library-5': 'pdf-library-5.zip',
			'pdf-library-6': 'pdf-library-6.zip',
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
