var carousel = {
	init: function init(){
		$('.outer-carousel-wrap').each(function(){
			var wrap = $(this);
			var slides = wrap.find('.carousel-content');
			var bullets = wrap.find('.cc-bull');
			var triggers = wrap.find('.carousel-trigger');
			var currentIndex = slides.index(slides.filter('.show').first());

			if (!slides.length){
				return;
			}
			if (currentIndex < 0){
				currentIndex = 0;
			}
			triggers.add(bullets).attr({
				'role': 'button',
				'tabindex': '0'
			});
			bullets.each(function(index){
				$(this).attr('aria-label', 'Show slide ' + (index + 1));
			});

			slides.attr({
				'role': 'group',
				'aria-roledescription': 'slide'
			});
			wrap.attr({
				'role': 'region',
				'aria-roledescription': 'carousel',
				'aria-label': 'Carousel'
			});
			carousel.showSlide(slides, bullets, currentIndex);

			triggers.filter('.left-trigger').on('click', function(){
				currentIndex = (currentIndex - 1 + slides.length) % slides.length;
				carousel.showSlide(slides, bullets, currentIndex);
			});
			triggers.filter('.right-trigger').on('click', function(){
				currentIndex = (currentIndex + 1) % slides.length;
				carousel.showSlide(slides, bullets, currentIndex);
			});
			bullets.each(function(index){
				$(this).on('click', function(){
					currentIndex = index;
					carousel.showSlide(slides, bullets, currentIndex);
				});
			});
			triggers.add(bullets).on('keydown', function(event){
				if (event.which === 13 || event.which === 32){
					event.preventDefault();
					$(this).trigger('click');
				}
			});
		});
	},
	showSlide: function showSlide(slides, bullets, index){
		slides.removeClass('show').attr('aria-hidden', 'true');
		slides.eq(index).addClass('show').attr('aria-hidden', 'false');
		bullets.removeClass('active').attr('aria-pressed', 'false');
		bullets.eq(index).addClass('active').attr('aria-pressed', 'true');
	}
};
