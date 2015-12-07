/**
 * Created by gareth on 3/12/15.
 */
Template.newSubvote.helpers({
    vote: function() {
        return VotesCollection.find({}, {sort: {totalVotes: -1}});
    },
    errorMessage: function(field) {
        return Session.get('subvoteSubmitErrors')[field]; },
    errorClass: function (field) {
        return !!Session.get('subvoteSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.newSubvote.events({
    'submit form': function(e, template) {
        e.preventDefault();
        var $title = $(e.target).find('[name=subvoteTitle]');
        var $description = $(e.target).find('[name=subvoteDescription]');
        var subvote = {
            subvoteTitle: $title.val(),
            subvoteDescription: $description.val(),
            voteId: template.data._id
        };
        var errors = {};
        if (! subvote.subvoteTitle) {
            errors.subvoteTitle = "Please write a title for your subvote";
            return Session.set('subvoteSubmitErrors', errors); }

        Meteor.call('subvoteInsert', subvote, function(error, subvoteId) { if (error){
            sAlert(error.reason, {}); } else {
            $title.val('');
            $description.val('');
        }
        }); }
});