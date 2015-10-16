VotesCollection = new Mongo.Collection('votesCollection');

Meteor.methods({
    voteInsert: function(voteAttributes) {
        check(Meteor.userId(), String);
        check(voteAttributes, {
            title: String,
            jurisdiction: String,
            officiallink: String,
            problem: String,
            votebody: String,
            isofficial: Boolean

        });
        var user = Meteor.user();
        var vote = _.extend(voteAttributes, {
            userID: user._id,
            author: user.username,
            submitted: new Date(),
            yesvote: 0,
            novote: 0,
            voters: [],
            totalvotes: 0
        });
        var voteId = VotesCollection.insert(vote);
        return {
            _id: voteId
        }; },

    voteYes: function (voteId) {
        check(Meteor.userId(), String);
        check(voteId, String);

        var vote = VotesCollection.findOne(voteId);
        if (!vote)
            throw new Meteor.Error('invalid', 'Vote item not found');

        if (_.include(vote.voters, Meteor.userId()))
            throw new Meteor.Error('invalid', 'Already voted');

        VotesCollection.update(vote._id, {
           $addToSet: {voters: Meteor.userId()},
            $inc: {yesvote: 1, totalvotes: 1}

        });
    },

    voteNo: function (voteId) {
        check(Meteor.userId(), String);
        check(voteId, String);

        var vote = VotesCollection.findOne(voteId);
        if (!vote)
            throw new Meteor.Error('invalid', 'Vote item not found');

        if (_.include(vote.voters, Meteor.userId()))
            throw new Meteor.Error('invalid', 'Already voted');

        VotesCollection.update(vote._id, {
            $addToSet: {voters: Meteor.userId()},
            $inc: {novote: 1, totalvotes: 1}
        });
    }

});