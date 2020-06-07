const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();
const publicPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../public/partials');

app.set('view engine', 'hbs');
app.set('views', publicPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicPath));
app.get('', (req, res) => {
  console.log(req.query);
  if (Object.keys(req.query).length === 0) {
    const name = 'Search city';
    return res.render('', { name });
  } else {
    forecast(req.query.city, (err, result) => {
      if (err) {
        const img =
          'https://img.icons8.com/cute-clipart/100/000000/nothing-found.png';
        return res.render('error', { main: err, img });
      }
      const { main } = result.weather[0];
      const { icon } = result.weather[0];
      const img = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const temp = result.main.temp - 273.15;
      const { name } = result;
      const temp_max = result.main.temp_max - 273.15;
      const temp_min = result.main.temp_min - 273.15;
      res.render('', { name, main, img, temp, temp_max, temp_min });
    });
  }
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Weather App | About',
    author: 'Abhishek Mogaveera',
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page Not Found',
  });
});
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
