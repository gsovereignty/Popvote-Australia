Polivote = new Mongo.Collection('polivote');

Meteor.methods({
    polivoteInsert: function (polivoteAttributes) {
        check(Meteor.userId(), String);
        check(polivoteAttributes, {name: String, voteId: String});
        var user = Meteor.user();
        var vote = VotesCollection.findOne(polivoteAttributes.voteId);
        if (!vote)
            throw new Meteor.Error('invalid-comment', 'You must comment on a post');
        polivote = _.extend(polivoteAttributes, {
            userId: user._id,
            submitted: new Date(),
            voted: [],
            indicatedYes: 0,
            indicatedNo: 0,
            indicatedUnsure: 0,
            votedYes: 0,
            votedNo: 0,
            abstained: 0
        });
        return Polivote.insert(polivote); }
    });
