const express = require('express');
const path = require('path');
const multer  = require('multer');
const passport = require('passport');

const dest = path.resolve(__dirname, ".." ,"uploads");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dest)
    },
    filename: function (req, file, cb) {
        const saveAs = Date.now() + '-' +file.originalname;
        req.body.profileFile =  saveAs
      cb(null, saveAs   )
    }
})
const uploads = multer({ storage: storage });

const handlers = require('./../controlers/customers');

const route = express.Router();

route.use(passport.authenticate('jwt', { session: false }));

route.get('/customers', handlers.get);
route.post('/customers', uploads.single('profile') , handlers.create);
route.patch('/customers', uploads.single('profile') , handlers.update);
route.delete('/customers', handlers.remove);

module.exports = route;


