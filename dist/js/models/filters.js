import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const filterSchema = new Schema({
    name: { type: String, unique: true },
    id: { type: String, unique: true },
});
const filtersSchema = new Schema({
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
export default model('Filters', filtersSchema);
