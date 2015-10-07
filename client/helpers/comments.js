Template.commentList.helpers({ comments: function() {
    return Comments.find({voteId: this._id}, {sort: {commentLikes: -1}});
    }
});

Template.commentItem.events({
    'click .like': function() {
        Meteor.call('likeComment', this._id);
    }

});