require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log('Hello world');
    res.send('Hello world')
})

app.post('/github', (req, res) => {
    console.log('Webhook Endpoint has been hit------------');
    console.log('Payload:');
    const payload = JSON.parse(req.body.payload)
    console.log(payload);
    
    res.status(200).send()
})

app.post('/telegram', (req, res) => {
    console.log('Telegram endpoint has been hit! ');
    console.log(req.body);
})

app.listen(port, () => {
    console.log('App is now listening on port ', port);
})

