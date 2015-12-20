var sortVotes = new ReactiveVar({});
var voteList = new ReactiveVar({});
Template.votesList.rendered = function () {
    if(!sortVotes.get()["totalVotes"]&&!sortVotes.get()["submitted"]) {
        sortVotes.set({ totalVotes: -1 })
    }
};

Template.votesList.helpers({
	vote: function() {
return voteList.get()
		},
    popularityButton: function(){
        if(sortVotes.get()["totalVotes"]) {return "active"} else {return ""}
    },
    freshnessButton: function(){
        if(sortVotes.get()["submitted"]) {return "active"} else {return ""}
    }
});

Template.votesList.events({
    'click .popularity': function() {sortVotes.set({ totalVotes: -1 })
    },
    'click .freshness': function() {sortVotes.set({ submitted: -1 });
    },
    'change [type=checkbox]': function () {
        var checkedstatus = document.getElementById('showvoted').checked;
        Session.set("showVoted", checkedstatus);
        }
});

Tracker.autorun(function () {
    voteList.set(VotesCollection.find({}, {sort: sortVotes.get()}));
});