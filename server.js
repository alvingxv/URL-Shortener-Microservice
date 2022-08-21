const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000
require('dotenv').config()
const cors = require('cors');
app.use(cors());

app.use(express.json());;

const mongoose = require('mongoose')
const { router } = require('./routes/routes')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to mongodb');
    }).catch(err => {
        console.log(err);
    });

//routes
app.use('/api', router)

//listen to port
app.listen(PORT, () => {
    console.log(`server is listening on ${PORT},
    http://localhost:${PORT}`)
})