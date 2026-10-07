var accordion = {
	init: function init(){
		accordion.wraps = $('.accordion-wrap');
		accordion.wraps.each(function(wrapIndex){
			var wrap = $(this);
			var sections = wrap.children('.section-title');

			sections.each(function(sectionIndex){
				var section = $(this);
				var heading = section.children('.title-wrap');
				var content = section.children('.section-content');
				var panelId = 'accordion-panel-' + wrapIndex + '-' + sectionIndex;

				heading.attr({
					'role': 'button',
					'tabindex': '0',
					'aria-controls': panelId,
					'aria-expanded': 'false'
				});
				content.attr({
					'id': panelId,
					'aria-hidden': 'true'
				}).hide();

				heading.on('click', function(){
					accordion.toggle(wrap, section);
				});
				heading.on('keydown', function(event){
					if (event.which === 13 || event.which === 32){
						event.preventDefault();
						accordion.toggle(wrap, section);
					}
				});
			});
		});
	},
	toggle: function toggle(wrap, section){
		var heading = section.children('.title-wrap');
		var content = section.children('.section-content');
		var shouldOpen = !content.is(':visible');

		wrap.children('.section-title').each(function(){
			var otherSection = $(this);
			otherSection.children('.title-wrap').attr('aria-expanded', 'false').removeClass('is-open');
			otherSection.children('.section-content').attr('aria-hidden', 'true').hide();
		});

		if (shouldOpen){
			heading.attr('aria-expanded', 'true').addClass('is-open');
			content.attr('aria-hidden', 'false').show();
		}
	}
};