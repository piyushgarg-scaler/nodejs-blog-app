const Blog = require('../models/blog')

exports.handleGetAllBlogs = async (req, res) => {
    const blogs = await Blog.find({});
    return res.json({ data: blogs })
}

exports.handleGetBlogById = async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id)
    return res.render('blog', { blog })
}

exports.handleCreateBlog = async (req, res) => {
    const { title, body } = req.body
    const userId = req.user._id

    const blog = await Blog.create({ title, body, createdBy: userId })

    return res.redirect(`/blog/${blog.id}`)

}

// blogId?
// userId?
// Blog.by(blogId)
// userId === Blog.createdBy allow the user to edit or delete