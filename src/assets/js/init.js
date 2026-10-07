iva = {
	init: function (){
		
		// Initiate Global JS functionality
		global.init();
		// Initiate ISI JS functionality
		isi.init();
		// Initiate Modals JS functionality
		modals.init();

		if ($('body').hasClass('accordion')){
			accordion.init();
		}
		if ($('body').hasClass('carousel')){
			carousel.init();
		}
		if ($('body').hasClass('tabbed-slide')){
			tabs.init();
		}
	}
};

iva.init();
