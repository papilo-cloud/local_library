const {Schema, model} = require("mongoose")
const {DateTime} = require('luxon')
const AuthorSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        maxLength: 100
    },
    family_name: {
        type: String,
        required: true,
        maxLength: 100
    },
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`
    }
    return fullname
});

// Virtual for author's date of birth
AuthorSchema.virtual('birth_date').get(function () {
    if (this.date_of_birth)
        return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
})

// Virtual for author's date of death
AuthorSchema.virtual('death_date').get(function () {
    if (this.date_of_death)
        return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
})

AuthorSchema.virtual('lifespan').get(function () {
    return this.birth_date +' - '+ this.death_date
})

// Virtual for author's URL
// Note: Declaring our URLs as a virtual in the schema is a good idea because
// then the URL for an item only ever needs to be changed in one place. 

AuthorSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/author/${this._id}`
});

// Export model
module.exports = model("Author", AuthorSchema);
