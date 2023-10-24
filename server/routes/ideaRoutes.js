const express = require('express');
const { getIdeas , createIdea , getIdeaById , updateIdea , deleteIdea} = require('../controllers/ideaControllers');
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware');

router.route('/').get(protect,getIdeas);
router.route('/create').post(protect,createIdea);
router.route('/:id').get(protect,getIdeaById).put(protect,updateIdea).delete(protect,deleteIdea);

module.exports = router ;