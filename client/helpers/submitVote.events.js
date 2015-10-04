Template.submitVote.events({ 'submit form': function(e) {
    e.preventDefault();
    var vote = {
        title: $(e.target).find('[name=title]').val(),
        jurisdiction: $(e.target).find('[name=jurisdiction]').val(),
        officiallink: $(e.target).find('[name=officiallink]').val(),
        problem: $(e.target).find('[name=problem]').val(),
        votebody: $(e.target).find('[name=votebody]').val()

    };

    Meteor.call('voteInsert', vote, function(error, result) { // display the error to the user and abort
        if (error)
            return alert(error.reason);
        Router.go('voteInfoPage', {_id: result._id});
    });



}
});