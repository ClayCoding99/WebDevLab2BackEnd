const express = require('express');
const app = express();
const fs = require('fs');

// app.use(express.static("client"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

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