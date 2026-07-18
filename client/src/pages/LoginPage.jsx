// ==================== pages/LoginPage.jsx ====================
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import styles from './LoginPage.module.css'
// Импорты: useState (react); Link, useNavigate (react-router-dom); useAuth (../context/AuthContext); styles
function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { login } = useAuth();
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        try {
            login(email, password).then(() => navigate('/my-notes'))
        } catch (error) {
            setError(error.message)
        }

    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Вход</h2>

                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit">Войти</button>

                <p className={styles.hint}>
                    Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </p>
            </form>
        </div>
    )

}
export default LoginPage
// Функция LoginPage()
//
// Состояние:
// - email
// - password
// - error — текст ошибки от сервера
//
// Через useAuth() достаёт login
// Через useNavigate() достаёт navigate

// Функция handleSubmit(e) — асинхронный обработчик отправки формы:
// - вызывает e.preventDefault()
// - сбрасывает error
// - вызывает login(email, password)
//   - при успехе — вызывает navigate('/my-notes')
//   - при ошибке — кладёт err.message в error

// return JSX:
//   <div className={styles.wrapper}>
//     <form className={styles.card} onSubmit={handleSubmit}>
//       <h2 className={styles.title}>Вход</h2>
//
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
//
//       { error && <p className={styles.error}>{error}</p> }
//
//       <button type="submit">Войти</button>
//
//       <p className={styles.hint}>
//         Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
//       </p>
//     </form>
//   </div>
