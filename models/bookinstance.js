const {Schema, model} = require("mongoose")

const BookInstanceSchema = new Schema({
    // Reference to the associated book
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    imprint: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Available", "Maintenance", "Loaned", "Reserved"],
        default: "Maintenance"
    },
    due_back: {
        type: Date,
        default: Date.now
    }
})

BookInstanceSchema.virtual("url").get(function () {
    return `/catalog/bookinstance${this._id}`
})

module.exports = model("BookInstance", BookInstanceSchema)