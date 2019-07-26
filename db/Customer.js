const mongoose = require('mongoose');

const { Schema } =  mongoose;

const customerSchema = new Schema({
    name:  {
        type: String
    },
    profile: {
        type: String
    },
    email:  {
        type: String
    },
    contact: {
      type: Number
    },
    city: {
        type: String
    },
    state: {
        type: String
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports  = Customer