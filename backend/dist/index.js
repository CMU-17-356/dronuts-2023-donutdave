import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
var app = express();
var port = process.env.PORT;
app.get('/', function (req, res) {
    res.send('Express + TypeScript Server');
});
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});
