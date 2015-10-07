Template.votesList.helpers({
	voteTitle: function() {
return VotesCollection.find({}, {sort: {"voters.length": -1}});
		}
});

