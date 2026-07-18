// ==================== context/AuthContext.jsx ====================
// Хранит и раздаёт всему приложению данные об авторизации без пробрасывания props вручную.
import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api/api'
// Импорты: createContext, useContext, useEffect, useState (react); api (../api/api)

// const AuthContext — контекст авторизации, значение по умолчанию null
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.check()
            .then((user) => setUser(user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])

    async function login(email, password) {
        const loggedInUse = await api.login(email, password)
        setUser(loggedInUse)
    }

    async function register(email, password) {
        const newUser = await api.register(email, password)
        setUser(newUser)
    }

    async function logout(params) {
        api.logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}



// Функция AuthProvider({ children }) — компонент-обёртка
//
// Состояние:
// - user — текущий залогиненный юзер или null
// - loading — идёт ли ещё первая проверка сессии на сервере
//

// При первом рендере (эффект без зависимостей) — через api.check() спрашивает сервер;
// результат кладёт в user, ошибку трактует как "не залогинен" (user = null),
// в конце снимает loading
//
// Функция login(email, password) — асинхронная:
// - через api.login(email, password) получает loggedInUser, кладёт в user
//
// Функция register(email, password) — асинхронная:
// - через api.register(email, password) получает newUser (сервер сразу логинит), кладёт в user
//
// Функция logout() — асинхронная:
// - вызывает api.logout(), обнуляет user
//
// return JSX:
//   <AuthContext.Provider value={{ user, loading, login, register, logout }}>
//     {children}
//   </AuthContext.Provider>

// Функция useAuth() — возвращает содержимое AuthContext (user, loading, login, register, logout)
