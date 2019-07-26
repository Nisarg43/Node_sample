require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const httpStatus = require('http-status');

const mongoose = require('mongoose');

const customersRoutes = require('./routes/customers.route');
const passport = require('passport');

const app = express();

const init = async ()=>{
    try {
        await mongoose.connect(process.env.DB_STRING);    
    } catch (error) {
        throw error
    }
}
init();

const passportJWT = require('./middleware/auth');

passport.initialize()

app.use(bodyParser.json())

app.use('/api', customersRoutes);


app.use((err, req, res, next) => {
    if (!err.status) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            code: "INTERNAL_SERVER_ERROR",
            message: "Server Error"
        });
    }
    
    return res.status(err.status).send(err);
})

app.listen(process.env.PORT, ()=>{
    console.log(`Application running on: ${process.env.PORT}`);
});


