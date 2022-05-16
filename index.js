const express = require("express");
const app = express();
const path = require("path");
const pageData = require('./data.json');
const flipData = require('./flipbook.json');
const jquery = require("jquery");
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.set('view_engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.get('/', (req, res) => {
    // res.send('Welcome to Home page');
    const sub = "Home"
    res.render('home.ejs', { sub })
})

app.get('/cats', (req, res) => {
    const cats = ['ruby', 'squeezy', 'pretty', 'rocky']
    const sub = "Cats";
    res.render('cats.ejs', { cats, sub });
})
app.get('/r/:sub', (req, res) => {
    const { sub } = req.params;
    const data = pageData[sub];
    if (data) {
        res.render('subpage.ejs', { sub, ...data });
    } else {
        res.render('notfound.ejs', { sub });
    }

})
app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    const sub = "Rand";
    res.render('random.ejs', { rand: num, sub });
})
app.get('/flip', (req, res) => {
    const sub = "Flipbook";
    res.render('flip.ejs', { sub });

})
app.get('/flipd', (req, res) => {
    const sub = "FlipbookDynamic";
    const org = "services";
    const data = flipData[org];
    console.log(data.pages.length);
    if (data) {
        res.render('flipdynamic.ejs', { sub, ...data });
    } else {
        res.render('notfound.ejs', { sub });
    }

})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})