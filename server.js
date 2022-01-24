// server config
const PORT = 8000
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express() // to get all functionality of 'express'
app.use(cors()) //  apply 'express' method 'use' and call cors 
app.use(express.json())

// create route to '/solve' and set up POST request on that URL
app.post('/solve', (req, res) => {

    // console.log(req.body.numbers); 

    const options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'solve-sudoku.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPID_API_KEY
        },
        data: {
            puzzle: req.body.numbers     // get the string from request body - get it from front-end 'dataToSolve' variable (app.js)
        }
    };

    axios.request(options).then((response) => {
        res.json(response.data) // to get the server response data and convert it to the JSON and when send to Front-End
    }).catch((error) => {
        console.error(error);
    });
})

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))