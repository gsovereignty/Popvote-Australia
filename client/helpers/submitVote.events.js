Template.submitVote.events({ 'submit form': function(e) {
    e.preventDefault();
    var vote = {
        title: $(e.target).find('[name=title]').val()
    };
    vote._id = VotesCollection.insert(vote);
    Router.go('byVotes');
}
});