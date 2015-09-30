Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/votes', {name: 'byVotes'});
Router.route('/submitvote', {name: 'submitVote'});

var requireLogin = function() { if (! Meteor.user()) {
  if (Meteor.loggingIn()) { this.render(this.loadingTemplate);
  } this.render('accessDenied');
} else {
  this.next(); }
}

Router.onBeforeAction(requireLogin, {only: 'submitVote'});