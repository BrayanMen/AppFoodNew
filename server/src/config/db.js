require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URI  = 'mongodb+srv://foodappnew:foodapp1@cluster1.69jajwv.mongodb.net/Cluster1?retryWrites=true&w=majority';


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connectede');
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1)
    }
}

module.exports = connectDB;