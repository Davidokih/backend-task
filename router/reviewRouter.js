const express = require('express');
const router = express.Router();

const { uploadReview, getAllReviews, getReviewDetail, updateReview, deleteReview } = require('../controller/reviewController');
const upload = require('../utils/multer');

router.route('/').get(getAllReviews);
router.route('/upload').post(upload.single('imageOrVideo'), uploadReview);
router.route('/:id').get(getReviewDetail);
router.route('/update/:id').patch(updateReview);
router.route('/delete/:id').delete(deleteReview);

module.exports = router;