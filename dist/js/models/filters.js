"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const filterSchema = new mongoose_1.Schema({
    name: { type: String, unique: true },
    id: { type: String, unique: true },
});
const filtersSchema = new mongoose_1.Schema({
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
filterSchema.plugin(mongoose_unique_validator_1.default);
exports.default = (0, mongoose_1.model)('Filters', filtersSchema);
