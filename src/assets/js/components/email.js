let approvedEmail = {
    init: function(){
        approvedEmail.cE();
        approvedEmail.eL();
    },
    cE: function() {
        approvedEmail.emailBtn              = $('#sendEmailBtn');
        approvedEmail.id            = 'VAULT_ID'; // EMAIL VAULT DOCUMENT ID FROM CLIENT VAULT GOES HERE
        approvedEmail.emailTemplate = '';
    },
    eL: function(){
        //FORM SUBMIT FUNCTIONALITY
        approvedEmail.emailBtn.on('click', function(e) {
            e.preventDefault();
            approvedEmail.getDocId(approvedEmail.id);
         })
    },

    getDocId: function getDocId(approvedEmailID) {
        //  alert('Inside get doc id Success: ' + approvedEmailID);
         // generally, this function is only used when Vault Instance Id's and Vaut Document Ids are hard-coded into the CLM content
            com.veeva.clm.getApprovedDocument("CLIENT_VAULT_LINK_GOES_HERE", approvedEmailID, approvedEmail.launchAE);
    },
    launchAE: function launchAE(result) {
        if (!result || result.success !== true) {
            alert("Error retrieving document: " + (result && result.error ? result.error : "Unknown error"));
            return;
        }

        var documentRecord = result.Approved_Document_vod__c;
        if (!documentRecord || !documentRecord.ID) {
            alert("Error retrieving document: Approved email document ID was not returned.");
            return;
        }

        approvedEmail.emailTemplate = documentRecord.ID;
        com.veeva.clm.launchApprovedEmail(approvedEmail.emailTemplate, '', approvedEmail.displayDocId);
    },
    displayDocId: function displayDocId(result) {
        //return type is a single re cord id from Approved_Document_vod__c
        if (result.success === true) {
            
        } else {
            alert("Error retrieving document: " + result.error);
        }
    },
};