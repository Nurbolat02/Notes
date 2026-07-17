const {Sequelize}= require('sequelize') // импортировать { Sequelize } из 'sequelize'

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {   dialect: 'postgres', 
        host: process.env.DB_HOST, 
        port: process.env.DB_PORT }
)
// создать и экспортировать new Sequelize(...):
//   - process.env.DB_NAME
//   - process.env.DB_USER
//   - process.env.DB_PASSWORD
//   - объект настроек: { dialect: 'postgres', host: process.env.DB_HOST, port: process.env.DB_PORT }
