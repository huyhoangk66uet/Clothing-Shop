
// import path from 'path';
import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session, { Cookie } from 'express-session';
const app = express();
const port = 3000;

//cookie-parser
app.use(cookieParser())

//express-session
app.use(session({
  secret: 'mk',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false}
}));



// connect database
import db from './config/db/index.js';
db.connect();

//connect router
import route from './routes/index.js';

//jsonwebtoken
import jwt from 'jsonwebtoken';

//jquery
app.use('/jquery', express.static('./node_modules/jquery/dist/'));

//read seq
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use file static
app.use(express.static('./src/public'));

//HTTP logger
app.use(morgan('combined'))

//Template engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './src/resources/views');


// Route init tu day moi quyet dinh tuyen duong di tiep theo (vao routes/index)
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})