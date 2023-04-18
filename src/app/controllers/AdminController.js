class AdminController {
    show(req, res, next) {
        res.render('./admin/home')
    }
}

export default new AdminController;