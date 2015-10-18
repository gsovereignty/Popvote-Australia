Template.votesList.helpers({
	voteTitle: function() {
return VotesCollection.find({}, {sort: {totalVotes: -1}});
		}
});

