let emailFrags = {
    init: function(){
        emailFrags.cE();
        emailFrags.eL();
    },
    cE: function() {
        emailFrags.emailBtn = $('#sendEtEfBtn');
        emailFrags.fragments = $('.fragment');
        emailFrags.emailTemplateId = '$12354';
    },
    eL: function(){
        emailFrags.fragments.on('click', function(e){
            e.preventDefault();
            var fragment = $(this);
            var isSelected = fragment.toggleClass('addToEmail').hasClass('addToEmail');
            fragment.find('p.add').text(isSelected ? 'Added to email' : 'Tap to add to email');
        });

        emailFrags.emailBtn.on('click', function(e){
            e.preventDefault();
            emailFrags.send();
        });
    },
    send: function send(){
        var selectedFragments = [];

        emailFrags.fragments.filter('.addToEmail').each(function(){
            var fragmentId = $(this).data('efid');
            if (fragmentId !== undefined && fragmentId !== null && fragmentId !== ''){
                selectedFragments.push(String(fragmentId));
            }
        });

        if (!selectedFragments.length){
            alert('Select at least one email fragment.');
            return;
        }

        if (typeof com === 'undefined' || !com.veeva || !com.veeva.clm){
            alert('Approved Email is only available in the Veeva app.');
            return;
        }

        com.veeva.clm.launchApprovedEmail(
            emailFrags.emailTemplateId,
            selectedFragments.join(','),
            emailFrags.handleSendResult
        );
    },
    handleSendResult: function handleSendResult(result){
        if (!result || result.success !== true){
            var message = result && (result.message || result.error) ? (result.message || result.error) : 'Unknown error';
            alert('Error launching Approved Email: ' + message);
        }
    }
};