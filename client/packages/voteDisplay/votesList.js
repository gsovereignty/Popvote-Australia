Template.votesList.helpers({
	vote: function() {
return VotesCollection.find({}, {sort: {totalVotes: -1}});
		}
});