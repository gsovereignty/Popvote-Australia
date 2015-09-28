Router.configure({
  layoutTemplate: 'layout'
});
Router.route('/votes', {name: 'byVotes'});
Router.route('/submitvote', {mame: 'submitVote'});