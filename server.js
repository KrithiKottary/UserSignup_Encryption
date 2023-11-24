console.log("Welcome to the User Registarion App!!! ");

import express from 'express';

import router  from "./routes/routes.js";

import bodyParser from "body-parser";

import session from  'express-session';

import MongoStore from 'connect-mongo';

import { uri } from './models/model.js';

import {} from "dotenv/config";

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{

    console.log(`App is listening at port 4050 ${PORT} !!!!`)
});

app.set('view engine', 'ejs');  // inorder to use ejs files

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

const session_store = new MongoStore({
    mongoUrl : uri,
    dbName : "DeltaAirWays",
    collectionName : "Delta_Session"

});

app.use(session({
    secret : "A Secret Key To Sign the Cookies",
    resave : false,
    saveUninitialized : false,
    session_store 
}));

// routing the page using the app (first case)  -- Code for testing the session variables
// app.get("/test", (req,res)=>{  
//     req.session.usr_name = "Harrison";
//     req.session.usr_email = "Harrison@gmail.com";

//     delete req.session.usr_name;
//     delete req.session.usr_email;

//     console.log(req.session);
//     res.send("Test Page !!!");
// });

app.use("/",router);