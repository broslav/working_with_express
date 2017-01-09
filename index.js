const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
    .create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/about', (req, res) => {
    let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune});
});
app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
   res.status(404);
   res.render('404');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
app.listen(app.get('port'), () => {
    console.log(`Express listening on ${app.get('port')} port;`);
});

let fortunes = [
    "Победи свои страхи, или они победят тебя.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждет приятный сюрприз.",
    "Будь проще везде, где только можно.",
];