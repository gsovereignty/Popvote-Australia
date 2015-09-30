Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/votes', {name: 'votesList'});
Router.route('/submitvote', {name: 'submitVote'});

var requireLogin = function() { if (! Meteor.user()) {
  if (Meteor.loggingIn()) { this.render(this.loadingTemplate);
  } this.render('accessDenied');
} else {
  this.next(); }
}

Router.onBeforeAction(requireLogin, {only: 'submitVote'});

Router.route('/votes/:_id', {
  name: 'voteItem',
  data: function() { return VotesCollection.findOne(this.params._id); }
});