var Schemas = {};

Schemas.VotesCollection = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 360
    },
    userID: {
        type: String,
        label: "User ID",
        optional: true
    },
    author: {
        type: String,
        label: "Username",
        max: 20
    },
    submitted: {
        type: Date,
        label: "Submit Date"
    }

});

VotesCollection.attachSchema(Schemas.VotesCollection);