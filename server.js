import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import fileRoutes from './routes/fileRoutes.js';

//loads .env file contents into process.env (environment variables)
dotenv.config();

const app = express();

//allows us to parse json information from http body to req.body 
app.use(express.json());
app.use(cors());

//connecting to the database
mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`)
  .then(() => {
    console.log("Database connected! 😃");
  })
  .catch((error) => {
    console.log(error.message);
    console.log("🤨");
  });

app.use('/api/files', fileRoutes);
//the files inside the folder will be served by our server
app.use('/uploads', express.static('./uploads'));

//listening for requests on port 3001
app.listen(3001, (req, res) => {
    console.log("Server is listening for HTTP requests on port 3001");
})