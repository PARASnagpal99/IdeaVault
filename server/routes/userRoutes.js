const express = require('express');
const router = express.Router();
const {registerUser,loginUser,updateUserProfile} = require('../controllers/userControllers')
const {protect} = require('../middlewares/authMiddleware');

router.route('/').post(registerUser) ;
router.route('/login').post(loginUser);
router.route('/profile').post(protect,updateUserProfile);

module.exports = router ;
