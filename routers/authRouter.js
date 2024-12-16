const exrpess = require('express');
const authController = require('../controllers/authController');
const router = exrpess.Router();

router.post('/signup', authController.signup);//when this functions execuutes, we are going to run what is inside authController
router.post('/signin', authController.signin);
module.exports = router;