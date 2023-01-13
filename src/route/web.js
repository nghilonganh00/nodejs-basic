import express, { Router } from "express";
import homeController from '../controller/homeController'
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage)
    router.post('/create-new-user', homeController.createNewUser)
    router.get('/detail/user/:id', homeController.getDetailPage)
    router.get('/about', (req, res) => {
        res.send(`I'm Eric`)
    })

    return app.use('/', router)
}

export default initWebRoute;