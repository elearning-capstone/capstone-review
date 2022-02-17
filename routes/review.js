const express = require("express");
const router = express.Router();
const { review } = require("../models");

router.get("/", async (req, res) => {
    try {
        return review.findAll({
            attributes: [ 'id', 'user_id', 'course_id', 'rating', 'comment' ],
        });
    } catch(err) {
        return res.status(404).json({ message: "not found" });
    }
});

router.post("/create", async (req, res) => {
    try {
        const { course_id, rating, comment } = req.body;

        let count_course = course.count({
            where: {
                id: course_id,
            }
        });

        if (await count_course == 0) {
            return res.status(404).json({ message: "course not found" });
        }

        let new_review = await review.create({
            user_id: req.user.user_id,
            course_id,
            rating,
            comment
        });

        return res.json({
            review: new_review
        });
    } catch(err) {
        return res.status(404).json({ message: "not found" });
    }
});

module.exports = router;