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
			});
		});
	},
	toggle: function toggle(wrap, section){
		var heading = section.children('.title-wrap');
		var content = section.children('.section-content');
		var shouldOpen = heading.attr('aria-expanded') !== 'true';

		wrap.children('.section-title').each(function(){
			var otherSection = $(this);
			if (!otherSection.is(section)){
				otherSection.children('.title-wrap').attr('aria-expanded', 'false').removeClass('is-open');
				otherSection.children('.section-content').stop(true, true).attr('aria-hidden', 'true').slideUp(250);
			}
		});

		if (shouldOpen){
			heading.attr('aria-expanded', 'true').addClass('is-open');
			content.stop(true, true).attr('aria-hidden', 'false').slideDown(250);
		} else {
			heading.attr('aria-expanded', 'false').removeClass('is-open');
			content.stop(true, true).attr('aria-hidden', 'true').slideUp(250);
		}
	}
};