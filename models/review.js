module.exports = (sequelize, DataTypes) => {
    const review = sequelize.define("review", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        comment: {
            type: DataTypes.STRING,
            defaultValue: "",
        }
    });

    return review;
}