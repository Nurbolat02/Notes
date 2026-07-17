const fs = require('fs')// импортировать fs
const bcrypt = require('bcryptjs')// импортировать bcryptjs
const dotenv = require('dotenv')// импортировать dotenv
dotenv.config({path: `${__dirname}/../.env`})
// dotenv.config({ path: `${__dirname}/../.env` }) — ДО импорта db.js, иначе process.env ещё пустой

const sequelize = require('../db')// импортировать sequelize из ../db (после dotenv.config!)
const {User, Note} = require('../models/models')// импортировать { User, Note } из ../models/models
const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`,'utf-8'))// прочитать data/users.json через fs.readFileSync + JSON.parse
const notes = JSON.parse(fs.readFileSync(`${__dirname}/data/notes.json`, 'utf-8'))// прочитать data/notes.json через fs.readFileSync + JSON.parse
// читаем тестовых юзеров
async function importData(params) {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        const createdUsers = {};
        for(const userData of users){
            const hashPassword = await bcrypt.hash(userData.password, 5);
            const user = await User.create({
                email:userData.email,
                role:userData.role,
                password:hashPassword
            })
            createdUsers[userData.email] = user.id
        }
        for(const noteData of notes){
            const note = await Note.create({
                text:noteData.text,
                title: noteData.title,
                userId: createdUsers[noteData.userEmail]
            })
        }
        console.log('Data successfully loaded!');
    } catch (error) {
        console.log(error)
    }
    process.exit()
} 
async function deleteData(params) {
    try {
          await sequelize.authenticate()
            await Note.destroy({where:{}, truncate: true, cascade: true, restartIdentity: true})
            await User.destroy({where:{},truncate:true, cascade:true, restartIdentity: true})  
    } catch (error) {
        console.log(error)
    }
 process.exit()
}
// async importData():
//   - sequelize.authenticate(), sequelize.sync()
//   - завести объект createdUsers = {} (email -> id)
//   - for (userData of users): захешировать пароль, User.create(...), сохранить id в createdUsers по email
//   - for (noteData of notes): Note.create({ title, text, userId: createdUsers[noteData.userEmail] })
//   - console.log при успехе, try/catch с console.log(err)
//   - process.exit() в конце

// async deleteData():
//   - sequelize.authenticate()
//   - Note.destroy({ where: {}, truncate: true, cascade: true })
//   - User.destroy({ where: {}, truncate: true, cascade: true })
//   - console.log при успехе, try/catch с console.log(err)
//   - process.exit() в конце
if(process.argv[2]=='--import'){
    importData()
}else if(process.argv[2]=='--delete'){
    deleteData()
}
// проверить process.argv[2]:
//   если '--import' — вызвать importData()
//   если '--delete' — вызвать deleteData()
