// To create controllers for bike details routes
import Bike from '../models/e.model.js';

export const createBike = async (req, res) => {
    const { name, brand, price, color, year } = req.body;
    console.log("name", name, "brand", brand, "price", price, "color", color, "year", year);
    if (!name || !brand || !price || !color || !year) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const newBike = await Bike.create({ name, brand, price, color, year });
        res.status(201).json({ message: 'Bike created successfully', bike: newBike });
    } catch (error) {   
        res.status(500).json({ message: 'Error creating bike', error: error.message });
    }
};

export const getAllBikes = async (req, res) => {
    try {
        const bikes = await Bike.find();
        res.status(200).json({ message: 'Bikes retrieved successfully', bikes });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bikes', error: error.message });
    }
};

export const deleteBike = async (req, res) => {
    const { name } = req.params;
    try {
        const deletedBike = await Bike.findOneAndDelete({ name }); 
        if (!deletedBike) {
            return res.status(404).json({ message: 'Bike not found' });
        }
        res.status(200).json({ message: 'Bike deleted successfully', bike: deletedBike });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting bike', error: error.message });
    }
};
