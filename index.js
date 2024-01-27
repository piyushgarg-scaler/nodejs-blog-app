const express = require('express')
const mongoose = require('mongoose')

const { checkForAuthentication } = require('./middleware/auth')

const authRoute = require('./routes/auth')
const blogRoute = require('./routes/blog')

mongoose.connect('mongodb+srv://admin:mrpN6qYpEXHZYKBt@cluster0.ceygqrk.mongodb.net/blog-app?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected..'))
    .catch(err => console.log(`Error Connecting MongoDB`, err))

const app = express();
const PORT = 8000

app.use(express.json())
app.use(checkForAuthentication)

app.get('/', (req, res) => res.json({ message: 'ok' }))

app.use('/auth', authRoute)
app.use('/blog', blogRoute)

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`))