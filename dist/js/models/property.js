"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const propertySchema = new mongoose_1.Schema({
    address: {
        road: String,
        number: Number,
    },
    neighborhood: String,
    numberOfRooms: Number,
    features: [String],
    size: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    levelOfquietness: Number,
    amenities: [String],
    pictureUrls: [String],
});
propertySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
propertySchema.plugin(mongoose_unique_validator_1.default);
exports.default = (0, mongoose_1.model)('Property', propertySchema);
