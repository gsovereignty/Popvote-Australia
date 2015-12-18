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
        if(sortVotes.get()["totalVotes"]) {return "btn-active"} else {return "btn-default"}
    },
    freshnessButton: function(){
        if(sortVotes.get()["submitted"]) {return "btn-active"} else {return "btn-default"}
    }
});

Template.votesList.events({
    'click .popularity': function() {sortVotes.set({ totalVotes: -1 })
    },
    'click .freshness': function() {sortVotes.set({ submitted: -1 });
    }
});

Tracker.autorun(function () {
    voteList.set(VotesCollection.find({}, {sort: sortVotes.get()}));
});