class ProfileController {
    show(req, res) {
        res.render('profile')
    }

    redirectPath(req, res) {
        res.redirect('/profile/info')
    }

}

export default new ProfileController;