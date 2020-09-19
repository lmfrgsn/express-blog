const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const posts = require('./Posts');

const app = express();

//Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'My Blog',
    posts,
  })
);

// Item route
app.get('/post/:url', (req, res) =>
// console.log(req.params.id),
  res.render('post', {
    post: posts.find((post) => post.url === req.params.url),
  })
);

// Create route
app.get('/create', (req, res) =>
  res.render('create', {
    title: 'Add a blog entry',
  })
);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
});
