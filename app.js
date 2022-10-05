const path = require('path');
//---------------------------------------------------------
const express = require('express');
const app = express();

//---------------------------------------------------------
const cookies = require('cookie-parser');

app.use(cookies());

//---------------------------------------------------------

const session = require('express-session');

// Configurando como Middleware o modulo session
app.use(session({
    secret:"RegisterAndLogin, this is the secret key",
    resave: false,
    saveUninitialized: false
})); 

//---------------------------------------------------------

// Middleware para verificar se usuário esta logado ou nao e assim alterar as opcoes de menu
const loggedUserData = require('./middlewares/loggedUserData');

//---------------------------------------------------------

app.set("view engine", 'ejs');

//---------------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(loggedUserData);

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

