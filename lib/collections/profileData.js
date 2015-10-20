AECData = new Mongo.Collection('aecData');

Meteor.methods({
    profileInsert: function (profileData) {
        check(Meteor.userId(), String);
        check(Meteor.user().profile.aecData, undefined);
        check(profileData, {
            givenName: String,
            familyName: String,
            federalDivision: String,
            stateDistrict: String,
            localCouncil: String,
            locality: String,
            ward: String
        });
        var user = Meteor.user();
        fullProfile = _.extend(profileData, {
            userId: user._id,
            creationDate: new Date(),

        });
        var fullProfileId = AECData.insert(fullProfile);
        Meteor.users.update(user, {
            $set:{
                profile: {
                    aecData: fullProfileId
                }
            }
        })},
    profileData: function (data) {
        if (Meteor.user().profile.aecData) {
            var fullProfileId = Meteor.user().profile.aecData;
        } else {throw new Meteor.Error('invalid', 'AEC Data Not Found');};
        var profile = AECData.findOne(Meteor.userId);
        return profile[data];
    }

})