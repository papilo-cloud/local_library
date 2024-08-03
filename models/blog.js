const mongoose = require('mongoose')

const {Schema, model} = mongoose

const blogSchema = new Schema({
    title: String,
    slug: String,
    published: Boolean,
    author: String,
    content: String,
    tags: [String],
    createdAt: Date,
    updatedAt: Date,
    comments: [
        {
            user: String,
            content: String,
            votes: Number
        }
    ]
})

const Blog = model('Blog', blogSchema)

module.exports = Blog