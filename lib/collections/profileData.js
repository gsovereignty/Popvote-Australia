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
            ward: String,
            stateCode: String
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
            var id = Meteor.user().profile.aecData;
            return AECData.findOne({_id:id}, {})[data];
        } else {throw new Meteor.Error('invalid', 'AEC Data Not Found');};
    }

})