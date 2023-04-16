class UserController {
    show(req, res, next) {
        res.render('./user')
    }
}

export default new UserController;