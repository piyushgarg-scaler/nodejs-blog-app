const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const { checkForAuthentication } = require('./middleware/auth')

const authRoute = require('./routes/auth')
const blogRoute = require('./routes/blog')

mongoose.connect('mongodb+srv://admin:mrpN6qYpEXHZYKBt@cluster0.ceygqrk.mongodb.net/blog-app?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(`Error Connecting MongoDB`, err))

const app = express();
const PORT = 8000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.use(checkForAuthentication)

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('index', { blogs: allBlogs, userId: req.user?._id })
})

app.get('/new', (req, res) => {
    if (req.user) return res.render('new');
    return res.redirect('/login')
})

app.get('/login', (req, res) => res.render('login'))

app.use('/auth', authRoute)
app.use('/blog', blogRoute)

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`))