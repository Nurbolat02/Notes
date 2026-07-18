// ==================== pages/RegisterPage.jsx ====================
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './LoginPage.module.css'
import { useState } from 'react'
// Импорты: useState (react); Link, useNavigate (react-router-dom); useAuth (../context/AuthContext);
// styles (./LoginPage.module.css — переиспользуются, вёрстка одинаковая)

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const { register } = useAuth();
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            await register(email, password)
            navigate('/my-notes')
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className={styles.wrapper}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Регистрация</h2>

                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit">Зарегистрироваться</button>

                <p className={styles.hint}>
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </p>
            </form>
        </div>
    )
}
export default RegisterPage
// Функция RegisterPage()
//
// Состояние:
// - email
// - password
// - error
//
// Через useAuth() достаёт register
// Через useNavigate() достаёт navigate

// Функция handleSubmit(e) — асинхронный обработчик отправки формы:
// - вызывает e.preventDefault()
// - сбрасывает error
// - вызывает register(email, password) (сервер создаёт юзера и сразу логинит)
//   - при успехе — вызывает navigate('/my-notes')
//   - при ошибке — кладёт err.message в error

// return JSX:
//   <div className={styles.wrapper}>
//     <form className={styles.card} onSubmit={handleSubmit}>
//       <h2 className={styles.title}>Регистрация</h2>
//
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
//
//       { error && <p className={styles.error}>{error}</p> }
//
//       <button type="submit">Зарегистрироваться</button>
//
//       <p className={styles.hint}>
//         Уже есть аккаунт? <Link to="/login">Войти</Link>
//       </p>
//     </form>
//   </div>
