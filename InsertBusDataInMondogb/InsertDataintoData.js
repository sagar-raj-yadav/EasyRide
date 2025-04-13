import dotenv from 'dotenv';
import connectDb from './db/db.js';
import BusDataModel from './models/BusDataModel.js';
import fs from 'fs';

dotenv.config();

// Read JSON file dynamically
const BusData = JSON.parse(fs.readFileSync('./BusData.json', 'utf8'));

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        await BusDataModel.create(BusData);
        console.log("Data successfully inserted into the database.");
    } catch (error) {
        console.error("Error while inserting data into the database:", error);
    }
};

start();

//write in terminal " node InsertDataintoData.js "