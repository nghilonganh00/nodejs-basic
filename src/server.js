import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import initWebRoute from './route/web.js';
import connection from './configs/connectDB';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Setup view engine
configViewEngine(app);

// Init web route
initWebRoute(app);

app.listen("3000", () => {
    console.log("Hello World!")
})