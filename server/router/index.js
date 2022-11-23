const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/user/:id', authMiddleware, userController.getUser);

module.exports = router;