var Schemas = {};

Schemas.VotesCollection = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 360
    }
});

VotesCollection.attachSchema(Schemas.VotesCollection);