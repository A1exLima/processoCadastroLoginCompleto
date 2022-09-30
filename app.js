const express = require('express');
const app = express();


const path = require('path');

app.set("view engine", 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

//---------------------------------------------------------

const RouterUser = require('./routers/RouterUser');
app.use('/', RouterUser);

//---------------------------------------------------------
app.use((req, res, next) => {
    res.status(404).send('Page not found');
    next(); 
});

//---------------------------------------------------------

app.listen(3000, ()=>{console.log('Server Runing Port 3000')});

