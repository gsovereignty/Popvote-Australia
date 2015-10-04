Template.commentList.helpers({ comments: function() {
    return Comments.find({voteId: this._id}, {sort: {submitted: -1}});
    }
});