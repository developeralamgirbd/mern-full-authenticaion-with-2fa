const {readdirSync} = require('fs');
const express = require('express');
const app = express();
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(morgan('default'));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

app.use(limiter);


readdirSync('./src/routes').map(r => app.use('/api/v1', require(`./src/routes/${r}`)));
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.DATABASE)
    .then(()=>{
        console.log('DB Connected')
        const port = process.env.PORT || 8000;
        app.listen(port, ()=>{
            console.log(`Server run success on port ${port}`)
        })
    })
    .catch((error)=>console.log(error))