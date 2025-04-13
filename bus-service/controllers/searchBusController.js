import Bus from '../models/Bus.js';


//search flight base on source_city, destination_city, date
const searchBus = async (req, res) => {
    const { source_city, destination_city } = req.query;

    try {
        if (!source_city || !destination_city) {
            return res.status(400).json({ message: 'Please provide source city and destination city.' });
        }

        // Perform case-insensitive search using regular expressions
        const buses = await Bus.find({
            source_city: { $regex: new RegExp(source_city, 'i') },
            destination_city: { $regex: new RegExp(destination_city, 'i') }
        });

        if (buses.length === 0) {
            return res.status(404).json({ message: 'No buses found for the given cities.' });
        }

        res.json(buses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//search bus based on particular id
const getBusById = async (req, res) => {
    try {
        const { id } = req.params;

        // Use findById directly with the ID
        const bus = await Bus.findById(id);

        if (!bus) {
            return res.status(404).json({ message: 'Bus not found with this ID' });
        }

        // Return the bus details if found
        res.json({ bus, success: "Bus data retrieved successfully by ID" });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: 'Internal server error' });
    }
};


export { searchBus, getBusById };
