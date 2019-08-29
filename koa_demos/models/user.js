
module.exports = (Sequelize, sequlize, models) => {
    const user = sequlize.define('user',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: Sequelize.STRING(30),
        age: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
    }, {
        timestamps: false
    })
    // models.user = user;
    // return user;
}