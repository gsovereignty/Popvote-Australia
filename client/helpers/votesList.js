Template.votesList.helpers({
	voteTitle: function() {
return VotesCollection.find({}, {sort: {submitted: -1}});
		}
});