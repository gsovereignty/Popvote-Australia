Template.voteBox.helpers({
	'voteTitle': function() {
		return votes["titleSource"];
	},
	'titleLength': function() {
		return votes.titleSource.length;
	}
});

votes = new Object();
votes.titleSource = "Foreign Acquisitions and Takeovers Fees Imposition Foreign Acquisitions and Takeovers Fees Imposition Bill 2015";