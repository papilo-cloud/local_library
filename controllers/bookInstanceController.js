const BookInstance = require('../models/bookinstance')
const Book = require('../models/book')
const asyncHandler = require("express-async-handler");
const {body, validationResult} = require('express-validator')

// Display list of all BookInstances.
exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find({}).populate('book').exec();

  res.render('bookinstance_list', {
    title: 'Book Instance List',
    bookinstance_list: allBookInstances
  })
});

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  const bookinstance = await BookInstance.findById(req.params.id).populate('book').exec()

  if (bookinstance == null) {
    const err = new Error('BookInstances not found')
    err.status = 404
    return next(err)
  }

  res.render('bookinstance_detail', {
    title: 'bookinstance_detail',
    bookinstance
  });
});

// Display BookInstance create form on GET.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, 'title').sort({title: 1}).exec()
  res.render('bookinstance_form', {
    title: 'Create BookInstances',
    books: allBooks
  })
});

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
  // Validate and sanitize
  body('book', 'Book must be specified')
    .trim()
    .isLength({min: 1})
    .trim()
    .escape(),
  body('imprint', 'Imprint must be specified')
    .trim()
    .isLength({min: 2})
    .trim()
    .escape(),
  body('status')
    .escape(),
  body('due_back', 'Invalid date')
    .optional({values: 'falsy'})
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validaton errors from a request.
    const errors = validationResult(req)

    // Create a book instance object.
    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    })
    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allBooks = await Book.find({}, 'title').sort({title: 1}).exec()

      res.render('bookinstance_form', {
        title: 'Create BookInstances',
        books: allBooks,
        bookinstance,
        selected_book:bookinstance.book._id,
        errors: errors.array()
      })
      return
    } else{
      // Data from form is valid
      await bookinstance.save()
      res.redirect(bookinstance.url)
    }
  })
]
// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
});

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
});

// Display BookInstance update form on GET.
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
});

// Handle bookinstance update on POST.
exports.bookinstance_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
});