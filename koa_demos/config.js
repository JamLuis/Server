const config = {
    dataBase: {
        database: 'newsapp',
        username: 'zhangfeihong',
        password: '123456',
        options: {
            host: 'localhost',
            port: 5432,
            dialect: 'postgres',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' | 'sqlite' */
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