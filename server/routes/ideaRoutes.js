const express = require('express');
const { getIdeas , createIdea , getIdeaById , updateIdea , deleteIdea} = require('../controllers/ideaControllers');
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware');
const cacheMiddleware = require('../middlewares/redisMiddleware')

router.route('/').get(protect,cacheMiddleware,getIdeas);
router.route('/create').post(protect,createIdea);
router.route('/:id').get(protect,cacheMiddleware,getIdeaById).put(protect,updateIdea).delete(protect,deleteIdea);

module.exports = router ;