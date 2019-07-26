const httpStatus = require('http-status');
const { isNil } = require('lodash');
const Customer = require('./../db/Customer');

const get = async (req, res, next) =>{
    try {
        const list = await Customer.find({});
        res.status(httpStatus.OK).send({
            result: list
        })
    } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                CODE: "INTERNAL_SERVER_ERROR",
                message: "Server Error"
            })
    }
}

const create = async (req, res, next) =>{
    try {
        const {
            name,
            contact,
            city,
            state,
            profileFile
        } = req.body;

        const newCustomer = new Customer({name, profile: profileFile ,contact, city, state});

        const result = await newCustomer.save();    
        res.status(httpStatus.OK).send({
            result 
        })
    } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                CODE: "INTERNAL_SERVER_ERROR",
                message: "Server Error"
            })
    }
}

const remove = async (req, res, next) =>{
    try {

        const { id } = req.body;

        const isExists = await Customer.findById(id);
        if (!isExists) {
            return res.status(httpStatus.BAD_REQUEST).send({
                code: "BAD_REQUEST",
                message: "Customer not found"
            })
        }
        const user = await Customer.findByIdAndRemove(id);
        res.status(httpStatus.OK).send({})
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            code: "INTERNAL_SERVER_ERROR",
            message: "Server Error"
        })
    }
}

const update = async (req, res, next) =>{
    try {

        const {
            id,
            name,
            contact,
            city,
            state,
            profileFile
        } = req.body;

        const isExists = await Customer.findById(id);
        if (!isExists) {
            return res.status(httpStatus.BAD_REQUEST).send({
                code: "BAD_REQUEST",
                message: "Customer not found"
            })
        }

        const data = {};

        if (!isNil(name)) {
            data.name = name;
        }

        if (!isNil(contact)) {
            data.contact = contact
        }

        if (!isNil(city)) {
            data.city = city
        }

        if (!isNil(state)) {
            data.state = state
        }

        if (!isNil(profileFile)) {
            data.profile = profileFile
        }
        
        const result = await Customer.findOneAndUpdate({ _id: id }, data,{ new: true });    
        res.status(httpStatus.OK).send({
            result 
        })
    } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                CODE: "INTERNAL_SERVER_ERROR",
                message: "Server Error"
            })
    }
}

module.exports = {
    get,
    create,
    remove,
    update
}