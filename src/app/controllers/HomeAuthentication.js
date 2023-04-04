class HomeAuthenticationController {
    
    // [GET] /home
    home(req, res, next) {
        res.render('./homeAuthentication')    
    }

    logout(req, res, next) {
        console.log(req.session.user_name)
        res.clearCookie('token');
        req.session.destroy((err) => {
            if(err) {
                console.log(err);
            } else {
                //res.render('./home')
                res.redirect('/')
            }
        })
    }
}

// exports cai gi thi khi require se nhan duoc cai do
export default new HomeAuthenticationController;