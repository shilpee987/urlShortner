import express from 'express';
import connectDB from './config/db.js';
import urlsRouter from './routes/urls.js';
import indexRouter from './routes/redirect.js';
import cors from 'cors'
const app = express();
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// import mongoose from "mongoose";

app.use('/',indexRouter)
app.use('/meraServer', urlsRouter);




  





app.listen(8080,() => {
    console.log(`Server is running at PORT 8080`);
  });