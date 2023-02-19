import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router } from './routes/routes.js';
dotenv.config();
var app = express();
var port = process.env.PORT;
// connect to db
mongoose
    .connect('mongodb://127.0.0.1:27017/donutdave_db')
    .catch(function (e) {
    console.error('Connection error', e.message);
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.get('/', function (req, res) {
    res.send('Express + TypeScript Server');
});
app.use(express.json());
app.use('/api/v1', router);
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});
