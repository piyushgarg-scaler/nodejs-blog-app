const express = require('express')
const { handleGetAllBlogs, handleGetBlogById, handleCreateBlog } = require('../controllers/blog')
const { ensureAuthenticated } = require('../middleware/auth')
const router = express.Router()
const Blog = require('../models/blog')

// Get all the Blogs
// Public
router.get('/', handleGetAllBlogs)

// Get blog by id
// Public
router.get('/:id', handleGetBlogById)

// Create a new blog
// Protected
router.post('/', ensureAuthenticated, handleCreateBlog)

router.delete('/:id', ensureAuthenticated, async (req, res) => {
    const blogToDelete = await Blog.findById(req.params.id)

    if (blogToDelete.createdBy == req.user._id) {
        await Blog.findByIdAndDelete(req.params.id)
    }

    return res.redirect('/')
})

// Edit blog
// Protected + Authroization?
// router.patch('/:id', ensureAuthenticated)

// Delete the blog by id
// Protected + Authroization?
// router.delete('/:id', ensureAuthenticated)

module.exports = router