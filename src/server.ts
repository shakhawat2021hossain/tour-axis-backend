/* eslint-disable no-console */
import { Server } from 'http'
import mongoose from 'mongoose';
import app from './app';
import { envVars } from './app/config/env';


let server: Server;
const port = envVars.PORT || 3000;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.MONGO_URI as string)
        console.log('✅ Connected to MongoDB');

        server = app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });

    }
    catch (error) {
        console.error('❌ Failed to start the server:', error);

    }
}

startServer()