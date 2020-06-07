const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const unixToDateTime = require('./utils/unix');

const app = express();
const publicPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../public/partials');
const port = process.env.PORT || 3000;
app.set('view engine', 'hbs');
app.set('views', publicPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicPath));
app.get('', (req, res) => {
  if (Object.keys(req.query).length === 0) {
    const name = 'Search city';
    const img = 'https://img.icons8.com/fluent/100/000000/smiling-sun.png';
    return res.render('', { name, img });
  } else {
    forecast(req.query.city, (err, result) => {
      if (err) {
        const img = 'https://img.icons8.com/fluent/100/000000/sad-sun.png';
        return res.render('error', { main: err, img });
      }
      const author = 'Abhishek Mogaveera';
      const { main } = result.weather[0];
      const { icon } = result.weather[0];
      const img = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const temp = `Temperature : ${Math.round(result.main.temp - 273.15)} °C`;
      const { name } = result;
      const wind = `Wind : ${(result.wind.speed * 3.6).toFixed(2)}km/hr`;
      const { humidity } = ` Humidity : ${result.main} %`;
      const { pressure } = `Pressure : ${result.main} hpa`;
      const sunrise = `Sunrise : ${unixToDateTime(result.sys.sunrise)}`;
      const sunset = `Sunset : ${unixToDateTime(result.sys.sunset)}`;
      const temp_max = `Max : ${Math.round(result.main.temp_max - 273.15)}°C`;
      const temp_min = `Min : ${Math.round(result.main.temp_min - 273.15)}°C`;
      res.render('', {
        name,
        main,
        img,
        temp,
        temp_max,
        temp_min,
        wind,
        humidity,
        sunrise,
        sunset,
        pressure,
        author,
      });
    });
  }
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page Not Found',
  });
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
