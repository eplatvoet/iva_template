var resourceLibrary = {
    init: function init(){
        resourceLibrary.modal = $('.resources-modal');
        resourceLibrary.content = resourceLibrary.modal.find('.outer-resource-wrapper-modal');

        $('.resource-card').on('click', function(){
            var card = $(this);
            var type = card.data('resource-type');
            var resource = card.data('resource');
            var title = card.find('.resource-title').text().trim();
            var description = card.find('.resource-description').text().trim();

            resourceLibrary.render(type, resource, title, description);
        });

        resourceLibrary.modal.find('.close').on('click', function(){
            resourceLibrary.clear();
        });
    },
    render: function render(type, resource, title, description){
        type = type === 'pocast' ? 'podcast' : type;
        resourceLibrary.clear();
        resourceLibrary.modal.find('#resourceTitle').text(title);
        resourceLibrary.modal.find('#resourceDescription').text(description);

        if (type === 'pdf'){
            resourceLibrary.modal.addClass('rpdf-modal');
            resourceLibrary.renderPdf(resource);
        } else if (type === 'video'){
            resourceLibrary.modal.addClass('rv-modal');
            resourceLibrary.renderMedia('video', resource, 'rv-', 'mp4');
        } else if (type === 'podcast'){
            resourceLibrary.modal.addClass('rp-modal');
            resourceLibrary.renderMedia('podcast', resource, 'rp-', 'mp3');
        }
    },
    renderPdf: function renderPdf(resource){
        var match = /^pdf([1-3])$/.exec(resource || '');
        if (!match) return;

        var imageWrapper = $('<div class="img-wrapper"></div>');
        var image = $('<img>').attr({
            src: '../shared/global-assets/images/' + resource + '.png',
            alt: resource.toUpperCase() + ' page 1'
        });
        imageWrapper.append(image);
        resourceLibrary.content.append(imageWrapper);
    },
    renderMedia: function renderMedia(type, resource, prefix, extension){
        var match = /^(?:video|podcast)([1-3])$/.exec(resource || '');
        if (!match) return;

        var wrapper = $('<div>').addClass(type + '-wrapper');
        var player = type === 'video' ? $('<video width="960" height="540" controls preload="metadata"></video>') : $('<audio controls preload="metadata"></audio>');
        player.attr('src', '../shared/global-assets/videos/' + prefix + match[1] + '.' + extension);
        player.attr('aria-label', resource.replace(/([0-9])$/, ' $1'));
        wrapper.append(player);
        resourceLibrary.content.append(wrapper);
    },
    clear: function clear(){
        if (!resourceLibrary.content) return;

        resourceLibrary.modal.removeClass('rpdf-modal rv-modal rp-modal');
        resourceLibrary.content.find('video, audio').each(function(){
            this.pause();
            this.removeAttribute('src');
            this.load();
        });
        resourceLibrary.content.empty();
        resourceLibrary.modal.find('#resourceTitle, #resourceDescription').empty();
    }
};