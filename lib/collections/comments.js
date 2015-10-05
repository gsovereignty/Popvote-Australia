Comments = new Mongo.Collection('comments');

Meteor.methods({
    commentInsert: function(commentAttributes) {
        check(this.userId, String);
        check(commentAttributes, {
            voteId: String,
            commentBody: String
        });
        var user = Meteor.user();
        var vote = VotesCollection.findOne(commentAttributes.voteId);
        if (!vote)
            throw new Meteor.Error('invalid-comment', 'You must comment on a post');
        comment = _.extend(commentAttributes, { userId: user._id,
            commentAuthor: user.username,
            commentSubmitted: new Date(),
            likes: [],
            commentLikes: 0
        });
        return Comments.insert(comment); },

    likeComment: function (commentId) {
        check(Meteor.userId(), String);
        check(commentId, String);

        var comment = Comments.findOne(commentId);
        if (!comment)
            throw new Meteor.Error('invalid', 'Comment item not found');

        if (_.include(comment.likes, Meteor.userId())) {
            throw new Meteor.Error('invalid', 'Already liked');}
        else {

        Comments.update(comment._id, {
            $addToSet: {likes: Meteor.userId()},
            $inc: {commentLikes: 1}

        });}
    }
});