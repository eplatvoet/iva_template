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
		if ($('body').hasClass('cards')){
			cards.init();
		}
		if ($('body').hasClass('carousel')){
			carousel.init();
		}
		if ($('body').hasClass('video')){
			video.init();
		}
		if ($('body').hasClass('progression')){
			progression.init();
		}
		if ($('body').hasClass('show-hide')){
			showHide.init();
		}
		if ($('body').hasClass('tabbed-content')){
			tabs.init();
		}
		if ($('body').hasClass('calculator')){
			calculator.init();
		}
		if($('body').hasClass('chap-video')){
			chapVideo.init();
		}
		if($('body').hasClass('resources')){
			resourceLibrary.init();
		}
		if ($('body').hasClass('email')){
			approvedEmail.init();
		}
		if ($('body').hasClass('email-frags')){
			emailFrags.init();
		}
	}
};

iva.init();
