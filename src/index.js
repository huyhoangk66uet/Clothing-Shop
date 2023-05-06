
// import path from 'path';
import express from 'express';
import morgan from 'morgan';
import { engine, create } from 'express-handlebars';
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

// Increase file upload limit

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));


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

app.engine(
    '.hbs', 
    engine({extname: '.hbs',
            helpers: {
              getThe2ndParameter: function(value1, ArrayValue1, ArrayValue2) {
                                      const value1Index = ArrayValue1.indexOf(value1);
                                      if (value1Index !== -1 && value1Index < ArrayValue2.length) {
                                          return ArrayValue2[value1Index];
                                      }
                                      return '';
                                  },
              multiplication: function(value1, value2){
                                  return value1 * value2
                              },
              check: function(value, Array1, Array2) {
                          return Array2[Array1.indexOf(value)]
                      },
              getValueAtIndex: function(Array, index) {
                return Array[index];
              },
              sum: (a,b) => a+b  ,
              difference: (a,b) => a-b,
              compareDate: function(date) {
                  var today = new Date()
            
                  return (date > today)
              },

              isNotNull: function(a) {
                  if(a === null){
                    return false;
                  }
                  return true;
              },

              dateString: function(date) {
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
              }
            }}),
    );
app.set('view engine', '.hbs');
app.set('views', './src/resources/views');

// Route init tu day moi quyet dinh tuyen duong di tiep theo (vao routes/index)
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})