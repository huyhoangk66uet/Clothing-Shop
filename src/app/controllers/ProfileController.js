class ProfileController {
    info(req, res) {
        res.render('profile', {name: 'info'})
    }

    email(req, res) {
        res.render('profile', {name: 'email'})
    }

    password(req, res) {
        res.render('profile', {name: 'password'})
    }

    phone(req, res) {
        res.render('profile', {name: 'phone'})
    }

    redirectPath(req, res) {
        res.redirect('/profile/info')
    }

}

export default new ProfileController;