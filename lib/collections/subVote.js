Subvote = new Mongo.Collection('subvotes');

Meteor.methods({
    subvoteInsert: function(subvoteAttributes) {
        check(this.userId, String);
        check(subvoteAttributes, {
            voteId: String,
            subvoteTitle: String,
            subvoteDescription: String
        });
        var user = Meteor.user();
        var vote = VotesCollection.findOne(subvoteAttributes.voteId);
        if (!vote)
            throw new Meteor.Error('invalid-subvote', 'Cannot find a linked vote');
        subvote = _.extend(subvoteAttributes, {
            userId: user._id,
            subvoteAuthor: user.username,
            subvoteSubmitted: new Date(),
        });
        return Subvote.insert(subvote); }
});