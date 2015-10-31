VotesCollection = new Mongo.Collection('votesCollection');

Meteor.methods({
    voteInsert: function(voteAttributes) {
        check(Meteor.userId(), String);
        check(voteAttributes, {
            title: String,
            jurisType: String,
            jurisName: String,
            officialLink: String,
            problem: String,
            voteBody: String,
            isofficial: Boolean


        });
        if (voteAttributes.officialLink.indexOf('.gov.au') >= 0) {
        } else {
            throw new Meteor.Error('invalid', 'The official link provided is incorrect, please try again.')
        }

        var user = Meteor.user();
        var vote = _.extend(voteAttributes, {
            userID: user._id,
            author: user.username,
            submitted: new Date(),
            yesVotes: 0,
            noVotes: 0,
            abstains: 0,
            yesVoters: [],
            noVoters: [],
            abstainers: [],
            totalVotes: 0
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

        if (_.include(vote.yesVoters, Meteor.userId()))
            throw new Meteor.Error('invalid', 'You have already voted on this item');

        if (_.include(vote.noVoters, Meteor.userId()))
            throw new Meteor.Error('invalid', 'You have already voted on this item');

        VotesCollection.update(vote._id, {
           $addToSet: {yesVoters: Meteor.userId()},
            $inc: {yesVotes: 1, totalVotes: 1}

        });
    },

    voteNo: function (voteId) {
        check(Meteor.userId(), String);
        check(voteId, String);

        var vote = VotesCollection.findOne(voteId);
        if (!vote)
            throw new Meteor.Error('invalid', 'Vote item not found');

        if (_.include(vote.yesVoters, Meteor.userId()))
            throw new Meteor.Error('invalid', 'You have already voted on this item');

        if (_.include(vote.noVoters, Meteor.userId()))
            throw new Meteor.Error('invalid', 'You have already voted on this item');

        VotesCollection.update(vote._id, {
            $addToSet: {noVoters: Meteor.userId()},
            $inc: {noVotes: 1, totalVotes: 1}
        });
    }

});