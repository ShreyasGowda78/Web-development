import mongoose from 'mongoose';
// To create a schema for bike details
const bikeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Bike = mongoose.model('Bike', bikeSchema);
export default Bike;    