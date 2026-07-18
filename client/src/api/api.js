// ==================== api/api.js ====================
// Слой общения с бэкендом — единое место, где живут все запросы к серверу.

// const BASE_URL — адрес бэкенда, берём из переменной окружения VITE_API_URL
// (Vite подставляет её на этапе сборки; для Vercel задаётся в настройках проекта —
// Environment Variables), а если переменной нет — используем http://localhost:5000/api
// для локальной разработки: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const BASE_URL = 'http://localhost:5000/api' // адрес бэкенда, к которому будут ходить все запросы

async function request(path, options = {}) { // обёртка вокруг fetch — чтобы не повторять одни и те же настройки в каждом запросе
    const res = await fetch(`${BASE_URL}${path}`, { // склеиваем базовый адрес и конкретный путь, например /user/login
        credentials: 'include', // обязательно для сессий — просим браузер посылать и принимать cookie даже на кросс-доменные запросы
        headers: {
            'Content-Type': 'application/json', // говорим серверу, что тело запроса — это JSON
        },
        ...options // остальные настройки запроса (method, body и т.д.), переданные при вызове request(...)
    })

    const data = await res.json().catch(() => null) // пытаемся распарсить тело ответа как JSON; если не получилось — data будет null

    if (!res.ok) { // res.ok — false, если статус ответа не 2xx (то есть сервер вернул ошибку)
        throw new Error(data?.message || 'Что-то пошло не так') // выбрасываем ошибку с текстом от сервера, чтобы её поймали в компоненте через try/catch
    }

    return data // если всё хорошо — возвращаем распарсенные данные вызывающему коду
}

export const api = { // единый объект со всеми методами общения с бэкендом, чтобы не разбрасывать fetch по компонентам
    register: (email, password) => // регистрация нового юзера
        request('/user/registration', {
            method: 'POST',
            body: JSON.stringify({ email, password }) // тело запроса должно быть строкой JSON, а не обычным объектом
        }),

    login: (email, password) => // вход в аккаунт
        request('/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        }),

    logout: () => request('/user/logout', { method: 'POST' }), // выход из аккаунта, тело не нужно

    check: () => request('/user/check'), // проверка, залогинен ли юзер сейчас (по умолчанию method: 'GET')

    getNotes: () => request('/note'), // получить все заметки всех юзеров

    getMyNotes: () => request('/note/my'), // получить только заметки текущего юзера

    createNote: (title, text) => // создать новую заметку
        request('/note', {
            method: 'POST',
            body: JSON.stringify({ title, text })
        }),

    updateNote: (id, title, text) => // изменить существующую заметку по id
        request(`/note/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, text })
        }),

    deleteNote: (id) => request(`/note/${id}`, { method: 'DELETE' }) // удалить заметку по id
}

// Функция request(path, options = {}) — обёртка вокруг fetch:
// - res — результат fetch(BASE_URL + path, { credentials: 'include', headers с Content-Type,
//   и ...options поверх })
// - data — тело ответа, распарсенное как JSON (или null, если не получилось распарсить)
// - если res не ok — выбрасывает Error с data?.message
// - иначе возвращает data

// const api — объект с методами:
//
// register(email, password) -> request('/user/registration', POST, { email, password })
// login(email, password)    -> request('/user/login', POST, { email, password })
// logout()                  -> request('/user/logout', POST)
// check()                   -> request('/user/check')          // GET по умолчанию
// getNotes()                -> request('/note')
// getMyNotes()               -> request('/note/my')
// createNote(title, text)    -> request('/note', POST, { title, text })
// updateNote(id, title, text) -> request(`/note/${id}`, PUT, { title, text })
// deleteNote(id)              -> request(`/note/${id}`, DELETE)
