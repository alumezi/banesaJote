"use strict";
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const filterSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    id: { type: String, unique: true },
});
const filtersSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    filters: [filterSchema],
});
filtersSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
filterSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Filters', filtersSchema);
