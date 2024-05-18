const cloudinary = require('../utils/cloudinary');
const reviewModel = require('../model/reviewModel');

exports.uploadReview = async (req, res) => {
    try {
        const { userName, review } = req.body;

        if (!req.file) {
            return res
                .status(400)
                .json({ error: "image or video is required" });
        }

        const myFileUrl = await cloudinary.uploads(req.file.path, "image");

        const userReview = new reviewModel({
            imageOrVideo: myFileUrl.url,
            userName,
            review
        });

        await userReview.save();

        res.status(201).json({ message: "Review uploaded successfully", data: userReview });
    } catch (error) {
        console.error("Error uploading review:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const review = await reviewModel.find();

        if (review < 1) {
            res.status(404).json({ message: 'Know Review Found' });
        }

        res.status(200).json({
            status: "Success",
            data: review
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

exports.getReviewDetail = async (req, res) => {
    try {
        const review = await reviewModel.findById(req.params.id);

        if (!review) {
            res.status(404).json({ message: 'Know Review Found' });
        }

        res.status(200).json({
            status: "Success",
            data: review
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const review = await reviewModel.findById(req.params.id);

        if (!review) {
            res.status(404).json({ message: 'Know Review Found' });
        }

        await review.findByIdAndUpdate(review._id, req.body, { new: true });
        res.status(200).json({
            status: "Success",
            message: "Review updated successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await reviewModel.findById(req.params.id);

        if (!review) {
            res.status(404).json({ message: 'Know Review Found' });
        }

        await review.findByIdAndDeletee(review._id, req.body, { new: true });
        res.status(200).json({
            status: "Success",
            message: "Review Deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};