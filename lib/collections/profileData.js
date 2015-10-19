aecData = new Mongo.Collection('aecData');

Meteor.methods({
    profileInsert: function (profileData) {
        check(this.userId, String);
        check(profileData, {
            userId: String,
            givenName: String,
            familyName: String,
            federalDivision: String,
            stateDistrict: String,
            localCouncil: String,
            locality: String,
            ward: String
        });

        var user = Meteor.user();
        if (user === profileData.userId) {

        }
    }
})

