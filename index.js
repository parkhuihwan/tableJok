const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // bodyParser for handling form data

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', (req, res) => {
    const selectedOptions = req.body.choice;
    if (Array.isArray(selectedOptions)) {
        res.send(`You selected: ${selectedOptions.join(', ')}`);
    } else if (selectedOptions) {
        res.send(`You selected: ${selectedOptions}`);
    } else {
        res.send('You did not select any options.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});