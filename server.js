const express = require('express');
const app = express();
const fs = require('fs');

var cors = require('cors');
app.use(cors({origin: 'https://capable-zabaione-55b4c1.netlify.app'}));

//app.use(express.static("client"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
        // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://capable-zabaione-55b4c1.netlify.app');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/chatbot', (req, res) => {
    console.log(req.body);
    const message = req.body.message;
    console.log(message);

    // extract a number from the message if there is any
    const number = message.match(/\d+/);
    console.log(number);

    if (number) {
        fetch(`http://numbersapi.com/${number}`)
            .then(response => response.text())
            .then(data => {
                console.log(data);
                res.json(
                    {text: data})
                })
            .catch(err => 
                res.json(
                    {text: "Sorry I couldn't find any information about that number."})
            );
    } else {
        res.json(
            {text: "Im sorry, I didn't understand the question. Please provide a number for me to give you information about."}
        );
    }
});

const port = 8000;
app.listen(port, () => {
    console.log("Now listening on port " + port + "!");
});