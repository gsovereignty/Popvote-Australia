VotesCollection = new Mongo.Collection('votesCollection');

Meteor.methods({
    voteInsert: function(voteAttributes) {
        check(Meteor.userId(), String);
        check(voteAttributes, {
            title: String
        });
        var user = Meteor.user();
        var vote = _.extend(voteAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        var voteId = VotesCollection.insert(vote);
        return {
            _id: voteId
        }; }
});