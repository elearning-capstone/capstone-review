const express = require("express");
const router = express.Router();
const { review, sequelize } = require("../models");

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

router.get("/is_review", async (req, res) => {
    try {
        const { course_id, user_id } = req.query;

        let count = await review.count({
            where: {
                course_id: course_id,
                user_id: user_id,
            },
        });

        // user already done review
        if (count > 0) {
            return res.json({ is_review: true });
        }

        // user didn't review
        return res.json({ is_review: false });
    } catch(err) {
        return res.status(404).json({ message: "not found" });
    }
});

router.get("/average", async (req, res) => {
    try {
        const { course_id } = req.query;

        let data = {};

        let result = await review.findAll({
            attributes: [ "course_id", [sequelize.fn("avg", sequelize.col("rating")), "avg"], [sequelize.fn("count", sequelize.col("rating")), "sum"] ],
            where: {
                course_id: course_id,
            },
            group: [ "course_id" ],
        });

        for (const element of result) {
            data[element.dataValues.course_id] = { avgReview: element.dataValues.avg, countReview: element.dataValues.sum };
        }

        for (const id of course_id) {
            if (!data.hasOwnProperty(id)) {
                data[id] = { avgReview: "0.0000", countReview: 0 };
            }
        }

        return res.json(data);
    } catch(err) {
        return res.status(404).json({ message: "not found" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { user_id, course_id } = req.query;
        const { rating, comment } = req.body;

        let count = await review.count({
            where: {
                course_id: course_id,
                user_id: user_id,
            },
        });

        // user already done review
        if (count > 0) {
            return res.status(403).json({ message: "user already review this course" });
        }
        
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