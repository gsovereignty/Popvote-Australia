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
            contributedIndicated: [],
            contributedActual: [],
            indicatedFor: 0,
            indicatedAgainst: 0,
            indicatedUnsure: 0,
            votedFor: 0,
            votedAgainst: 0,
            abstained: 0,
            flaggers: [],
            flags: 0
        });
        return Polivote.insert(polivote); },

    indFor: function (polivoteId) {
        check(Meteor.userId(), String);
        check(polivoteId, String);
        var polivote = Polivote.findOne(polivoteId);
        if (!polivote)
            throw new Meteor.Error('invalid', 'Polivote not found');
        if (_.include(polivote.contributedIndicated, Meteor.userId())) {
            throw new Meteor.Error('invalid', 'We already received your feedback');}
        else {
            Polivote.update(polivote._id, {
                $addToSet: {contributedIndicated: Meteor.userId()},
                $inc: {indicatedFor: 1}
            })
        }
    },

    indAgainst: function (polivoteId) {
        check(Meteor.userId(), String);
        check(polivoteId, String);
        var polivote = Polivote.findOne(polivoteId);
        if (!polivote)
            throw new Meteor.Error('invalid', 'Polivote not found');
        if (_.include(polivote.contributedIndicated, Meteor.userId())) {
            throw new Meteor.Error('invalid', 'We already received your feedback');}
        else {
            Polivote.update(polivote._id, {
                $addToSet: {contributedIndicated: Meteor.userId()},
                $inc: {indicatedAgainst: 1}
            })
        }
    },

    indUnsure: function (polivoteId) {
        check(Meteor.userId(), String);
        check(polivoteId, String);
        var polivote = Polivote.findOne(polivoteId);
        if (!polivote)
            throw new Meteor.Error('invalid', 'Polivote not found');
        if (_.include(polivote.contributedIndicated, Meteor.userId())) {
            throw new Meteor.Error('invalid', 'We already received your feedback');}
        else {
            Polivote.update(polivote._id, {
                $addToSet: {contributedIndicated: Meteor.userId()},
                $inc: {indicatedUnsure: 1}
            })
        }
    },

    actualFor: function (polivoteId) {
        check(Meteor.userId(), String);
        check(polivoteId, String);
        var polivote = Polivote.findOne(polivoteId);
        if (!polivote)
            throw new Meteor.Error('invalid', 'Polivote not found');
        if (_.include(polivote.contributedActual, Meteor.userId())) {
            throw new Meteor.Error('invalid', 'We already received your feedback');}
        else {
            Polivote.update(polivote._id, {
                $addToSet: {contributedActual: Meteor.userId()},
                $inc: {votedFor: 1}
            })
        }
    },

    actualAgainst: function (polivoteId) {
        check(Meteor.userId(), String);
        check(polivoteId, String);
        var polivote = Polivote.findOne(polivoteId);
        if (!polivote)
            throw new Meteor.Error('invalid', 'Polivote not found');
        if (_.include(polivote.contributedActual, Meteor.userId())) {
            throw new Meteor.Error('invalid', 'We already received your feedback');}
        else {
            Polivote.update(polivote._id, {
                $addToSet: {contributedActual: Meteor.userId()},
                $inc: {votedAgainst: 1}
            })
        }
    },

    abstained: function (polivoteId) {
        check(Meteor.userId(), String);
        check(polivoteId, String);
        var polivote = Polivote.findOne(polivoteId);
        if (!polivote)
            throw new Meteor.Error('invalid', 'Polivote not found');
        if (_.include(polivote.contributedActual, Meteor.userId())) {
            throw new Meteor.Error('invalid', 'We already received your feedback');}
        else {
            Polivote.update(polivote._id, {
                $addToSet: {contributedActual: Meteor.userId()},
                $inc: {abstained: 1}
            })
        }
    },
    flag: function (polivoteId) {
        check(Meteor.userId(), String);
        check(polivoteId, String);
        var polivote = Polivote.findOne(polivoteId);
        if (!polivote)
            throw new Meteor.Error('invalid', 'Polivote not found');
        if (_.include(polivote.flaggers, Meteor.userId())) {
            throw new Meteor.Error('invalid', 'We already received your feedback');}
        else {
            Polivote.update(polivote._id, {
                $addToSet: {flaggers: Meteor.userId()},
                $inc: {flags: 1}
            })
        }
    }


    });