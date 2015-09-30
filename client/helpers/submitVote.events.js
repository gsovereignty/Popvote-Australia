Template.submitVote.events({ 'submit form': function(e) {
    e.preventDefault();
    var vote = {
        title: $(e.target).find('[name=title]').val()
    };

    Meteor.call('voteInsert', vote, function(error, result) { // display the error to the user and abort
        if (error)
            return alert(error.reason);
        Router.go('voteItem', {_id: result._id});
    });



}
});