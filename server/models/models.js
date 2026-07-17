const sequelize = require('../db') // импортировать sequelize из ../db
const { DataTypes } = require('sequelize') // импортировать { DataTypes } из 'sequelize'

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING, defaultValue: 'USER' }
})

const Note = sequelize.define('note', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING },
	text: { type: DataTypes.TEXT }
})

User.hasMany(Note)
Note.belongsTo(User)

module.exports = {
	// экспортируем обе модели, чтобы использовать их в контроллерах
	User,
	Note
}
// sequelize.define('user', {...}):
//   id — INTEGER, primaryKey, autoIncrement
//   email — STRING, unique
//   password — STRING (тут будет храниться bcrypt-хеш, не сам пароль)
//   role — STRING, defaultValue "USER"

// sequelize.define('note', {...}):
//   id — INTEGER, primaryKey, autoIncrement
//   title — STRING
//   text — TEXT

// User.hasMany(Note) — один юзер может иметь много заметок (добавит userId в Note)
// Note.belongsTo(User) — обратная связь

// экспортировать { User, Note }
