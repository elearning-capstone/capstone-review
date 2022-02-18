const express = require("express");
const router = express.Router();
const { review } = require("../models");

router.get("/", async (req, res) => {
    try {
        const { course_id } = req.query;

        let reviews = await review.findAll({
            where: {
                course_id: course_id
            },
        });

        return res.json({
            review: reviews,
        });
    } catch(err) {
        return res.status(404).json({ message: "not found" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { user_id, course_id } = req.query;
        const { rating, comment } = req.body;
        
        let new_review = await review.create({
            user_id,
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