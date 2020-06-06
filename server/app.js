const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const publicPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../public/partials');
app.set('view engine', 'hbs');
app.set('views', publicPath);
hbs.registerPartials(partialPath);
app.get('', (req, res) => {
  res.render('index', { title: 'Weather App', author: 'Abhishek Mogaveera' });
});
app.get('/about', (req, res) => {
  res.render('index', {
    title: 'Weather App | About',
    author: 'Abhishek Mogaveera',
  });
});
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
