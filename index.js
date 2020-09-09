const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
 // by default website run on port 80
const port = 8000;                                               
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());
// this will help in accessing the static css and other files
app.use(express.static('./assets'));
// we have to include expresslayouts before route 
// because we need layout before route

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes'));

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err)
        console.log(`Error in running the server : ${err}`);
    console.log(`server is running on port: ${port}`);
});