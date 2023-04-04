// import tat ca cac router khac vao day (cong chinh)
import homeRouter from './home.router.js'
import loginRouter from './login.router.js'
import registerRouter from './register.router.js'
import MiddleWare from '../app/controllers/MiddleWare.js'
import homeAuthenticationRouter from './homeAuthentication.router.js'
import productRouter from './product.router.js'

export default function route(app) {

    app.use('/product', productRouter);
    app.use('/homePage', MiddleWare.checkAuthentication, homeAuthenticationRouter);
    app.use('/login' , MiddleWare.checkOutAuthentication, loginRouter);
    app.use('/register',MiddleWare.checkOutAuthentication, registerRouter);
    app.use('/',MiddleWare.checkOutAuthentication, homeRouter);

}


