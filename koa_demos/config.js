const config = {
    dataBase: {
        database: 'test001',
        username: 'root',
        password: '123456',
        options: {
            host: 'localhost',
            port: 3306,
            dialect: 'mysql',
            pool: {
                max: 10,
                min: 0,
                idel: 30000
            }
        }
    },
    sequelize: null,
}

module.exports = config;