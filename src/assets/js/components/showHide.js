var showHide = {
    init: function init(){
        $('.outer-show-hide-wrapper').each(function(){
            var wrapper = $(this);
            var stepContents = wrapper.find('.step-content');
            var expandTrigger = wrapper.find('.expand-all-trigger');

            showHide.bindTrigger(expandTrigger, function(){
                var shouldExpand = stepContents.filter('.show').length !== stepContents.length;
                stepContents.toggleClass('show', shouldExpand);
                showHide.updateExpandTrigger(expandTrigger, shouldExpand);
            });

            wrapper.find('.sh-trigger').each(function(){
                var trigger = $(this);
                var content = trigger.siblings('.step-content');

                showHide.bindTrigger(trigger, function(){
                    content.toggleClass('show');
                    trigger.attr('aria-expanded', content.hasClass('show') ? 'true' : 'false');
                    showHide.updateExpandTrigger(
                        expandTrigger,
                        stepContents.length > 0 && stepContents.filter('.show').length === stepContents.length
                    );
                });
            });
        });
    },
    bindTrigger: function bindTrigger(trigger, activate){
        trigger.attr({
            'role': 'button',
            'tabindex': '0',
            'aria-expanded': 'false'
        });
        trigger.on('click', activate);
    },
    updateExpandTrigger: function updateExpandTrigger(trigger, isExpanded){
        trigger.attr('aria-expanded', isExpanded ? 'true' : 'false');
        trigger.find('p').text(isExpanded ? 'Collapse all' : 'Expand all');
    }
};