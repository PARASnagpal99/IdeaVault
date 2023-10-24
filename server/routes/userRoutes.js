const express = require('express');
const router = express.Router();
const {registerUser,loginUser,updateUserProfile} = require('../controllers/userControllers')
const {protect} = require('../middlewares/authMiddleware');
const cacheMiddleware = require('../middlewares/redisMiddleware')


router.route('/').post(registerUser) ;
router.route('/login').post(loginUser);
router.route('/profile').post(protect,cacheMiddleware,updateUserProfile);

module.exports = router ;
