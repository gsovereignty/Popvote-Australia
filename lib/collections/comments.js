Comments = new Mongo.Collection('comments');

Meteor.methods({
    commentInsert: function(commentAttributes) {
        check(this.userId, String); check(commentAttributes, {
            voteId: String,
            commentBody: String
        });
        var user = Meteor.user();
        var vote = VotesCollection.findOne(commentAttributes.voteId);
        if (!vote)
            throw new Meteor.Error('invalid-comment', 'You must comment on a post');
        comment = _.extend(commentAttributes, { userId: user._id,
            commentAuthor: user.username,
            commentSubmitted: new Date()
        });
        return Comments.insert(comment); }
});