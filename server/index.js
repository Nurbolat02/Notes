require('dotenv').config({ path: `${__dirname}/.env` })// подключить dotenv и вызвать .config(), чтобы .env подгрузился в process.env (путь через __dirname, чтобы работало независимо от того, откуда запущен процесс)
const express = require('express')// импортировать express
const cors = require('cors')// импортировать cors
const session = require('express-session')// импортировать express-session
const sequelize = require('./db')// импортировать sequelize из ./db
const router = require('./routes/index')// импортировать общий роутер из ./routes
const errorMiddleware = require('./middleware/errorMiddleware')// импортировать errorMiddleware из ./middleware/errorMiddleware



const PORT = process.env.PORT || 5000;// определить PORT: process.env.PORT, если нет — 5000
const isProduction = process.env.NODE_ENV === 'production'// на Railway выставляем NODE_ENV=production
const app = express()// создать app = express()
app.set('trust proxy', 1)// Railway/Vercel стоят за прокси — без этого secure-cookie не выставится
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}))// app.use(cors({...})) — origin: process.env.CLIENT_URL (или localhost:3000 по умолчанию), credentials: true
app.use(express.json())// app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:1000*60*60*24*7,
        secure: isProduction,// cookie только по HTTPS в проде (Railway всегда отдаёт HTTPS)
        sameSite: isProduction ? 'none' : 'lax'// 'none' обязателен, когда фронт и бэк на разных доменах (Vercel + Railway)
    }
}))// app.use(session({...})) — secret из process.env.SESSION_SECRET, resave: false, saveUninitialized: false, cookie.maxAge — неделя в мс
app.use('/api', router)// app.use('/api', router)
app.use(errorMiddleware)// app.use(errorMiddleware) — обязательно последним, после всех роутов

async function start(params) {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>console.log('Server is working'))
    } catch (error) {
        console.log(error)
    }

}
start()
// async функция start:
//   - await sequelize.authenticate()
//   - await sequelize.sync()
//   - app.listen(PORT, () => console.log(...))
//   - обернуть в try/catch, в catch — console.log(ошибку)

// вызвать start()
