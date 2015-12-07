Template.displaySubvotes.helpers({
    subvote: function() {
        return Subvote.find({voteId: this._id}, {});
    }
});