Template.votesList.helpers({
	voteTitle: function() {
return VotesCollection.find({}, {sort: {totalvotes: -1}});
		}
});

