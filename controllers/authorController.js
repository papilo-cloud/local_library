const Author = require('../models/author')
const Book = require('../models/book')
const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator')

// Display list of all authors
exports.author_list = asyncHandler(async (req, res, next) => {
    
    const allAuthors = await Author.find({}).sort({family_name: 1}).exec()
    res.render('author_list', {
        title: 'Author List Page',
        author_list: allAuthors
    })
})

// Display detail page for a specific Author
exports.author_detail = asyncHandler(async (req, res, next) => {
    const [author, booksByAuthor] = await Promise.all([
        Author.findById(req.params.id).exec(),
        Book.find({author: req.params.id}, 'title summary').exec()
    ])

    if (author == null) {
        const err = new Error('Author not found')
        err.status = 404
        return next(err)
    }

    res.render('author_detail', {
        title: 'Author Details',
        author,
        author_books: booksByAuthor
    })
})

// Display Author create form on GET
exports.author_create_get = (req, res, next) => {
    res.render('author_form', {
        title: 'Create Author'
    })
}

// Handle Author create on POST
exports.author_create_post = [
    body('fname')
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage('First name must be specified.')
        .isAlphanumeric()
        .withMessage('First name has non-alphanumeric characters.'),
    body('lname')
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage('Family name must be specified.')
        .isAlphanumeric()
        .withMessage('Family name has non-alphanumeric characters.'),
    body('birth')
        .optional({values: 'falsy'})
        .isISO8601()
        .toDate(),
    body('death')
        .optional({values: 'falsy'})
        .isISO8601()
        .toDate(),  

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const author = new Author({
            first_name: req.body.fname,
            family_name: req.body.lname,
            date_of_birth: req.body.birth,
            date_of_death: req.body.death
        })
        console.log(errors.array())
        if (!errors.isEmpty()) {
            res.render('author_form',{
                title: 'Create Author',
                author,
                errors: errors.array()
            })
        }
        else{
            await author.save()
            res.redirect(author.url)
        }
})]
// Display Author delete form on GET
exports.author_delete_get = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Author delete GET`)
})
// Handle Author delete on POST
exports.author_delete_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Author delete POST`)
})
// Display Author update form on GET
exports.author_update_get = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Author update GET`)
})
// Handle Author update on POST
exports.author_update_post = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Author update POST`)
})