// import tat ca cac router khac vao day (cong chinh)
import homeRouter from './home.router.js'
import loginRouter from './login.router.js'
import registerRouter from './register.router.js'
import MiddleWare from '../app/controllers/MiddleWare.js'
import homeAuthenticationRouter from './homeAuthentication.router.js'
import productRouter from './product.router.js'
import cartRouter from './cart.router.js'
import paymentRouter from './payment.router.js'
import orderRouter from './order.router.js'
import profileRouter from './profile.router.js'
import adminRouter from './admin.router.js'

export default function route(app) {

    app.use('/admin',MiddleWare.checkAuthentication, MiddleWare.checkAdmin, adminRouter)
    app.use('/profile', profileRouter)
    app.use('/order', MiddleWare.checkAuthentication, orderRouter)
    app.use('/payment', MiddleWare.checkAuthentication, paymentRouter);
    app.use('/cart', MiddleWare.checkAuthentication, cartRouter);
    app.use('/product', productRouter);
    app.use('/homePage', MiddleWare.checkAuthentication, homeAuthenticationRouter);
    app.use('/login' , MiddleWare.checkOutAuthentication, loginRouter);
    app.use('/register',MiddleWare.checkOutAuthentication, registerRouter);
    app.use('/',MiddleWare.checkOutAuthentication, homeRouter);

}


