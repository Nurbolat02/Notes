const {Sequelize}= require('sequelize') // импортировать { Sequelize } из 'sequelize'

// Railway (и большинство хостингов Postgres) дают один готовый connection string в
// DATABASE_URL — если он есть, подключаемся через него (плюс SSL, это Railway требует);
// иначе (локальная разработка) собираем подключение из отдельных DB_* переменных
module.exports = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false }
        }
    })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {   dialect: 'postgres',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT }
    )
// создать и экспортировать new Sequelize(...):
//   - если задан DATABASE_URL (Railway) — подключение по строке, с SSL
//   - иначе — process.env.DB_NAME, DB_USER, DB_PASSWORD, { dialect: 'postgres', host: DB_HOST, port: DB_PORT }
