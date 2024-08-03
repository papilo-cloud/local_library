const {Schema, model} = require("mongoose")

const GenreSchema = new Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 100,
        required: true
    }
        
})

GenreSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/genre/${this._id}`
});

module.exports = model("Genre", GenreSchema)
