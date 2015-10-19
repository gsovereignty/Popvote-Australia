AECData = new Mongo.Collection('aecData');

Meteor.methods({
    profileInsert: function (profileData) {
        check(Meteor.userId(), String);
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
        })
        }
})