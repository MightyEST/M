var express = require('express');
const router = express.Router();
const controller = require('./../controllers/articleController');
const uploadController = require('./../controllers/uploadController');

router.route('/create')
    .get(controller.article_create_get)
    .post(uploadController.single('article_image'),controller.article_create_post);

router.route('/:id')
    .get(controller.article_get_single)
    .patch(controller.article_update)
    .delete(controller.article_delete);

router.route('/')
    .get(controller.article_get_all);

 module.exports = router;
