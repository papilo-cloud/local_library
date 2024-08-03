const {Schema, model} = require("mongoose")

const GenreSchema = new Schema({
    category: {
        fiction: {
            type: Schema.Types.ObjectId,
            name:{ 
                type: String,
                minlength: 3,
                maxlength: 100,
                required: true
            },
            ref: 'Book'
        },
        non_fiction: {
            type: Schema.Types.ObjectId,
            name:{ 
                type: String,
                minlength: 3,
                maxlength: 100,
                required: true
            },
            ref: 'Book'
        },
        romance: {
            type: Schema.Types.ObjectId,
            name:{ 
                type: String,
                minlength: 3,
                maxlength: 100,
                required: true
                
            },
            ref: 'Book'
        },
        military: {
            type: Schema.Types.ObjectId,
            name:{ 
                type: String,
                minlength: 3,
                maxlength: 100,
                required: true
            },
            ref: 'Book'
        },
    }
})

GenreSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/genre/${this._id}`
});

module.exports = model("Genre", GenreSchema)