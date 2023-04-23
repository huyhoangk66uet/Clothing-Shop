class ProfileController {
    show(req, res) {
        res.render('profile')
    }

    info(req, res) {
        res.sendFile('/src/resources/views/profileElements/info.hbs')
    }

    password(req, res) {
        res.sendFile('/src/resources/views/profileElements/password.hbs')
    }

    email(req, res) {
        res.sendFile('/src/resources/views/profileElements/email.hbs')
    }

    phone(req, res) {
        res.sendFile('/src/resources/views/profileElements/phone.hbs')
    }
}

export default new ProfileController;