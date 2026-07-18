// ==================== components/Navbar.jsx ====================
// Шапка сайта, показывается на каждой странице.
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Navbar.module.css'
// Импорты: Link, useNavigate (react-router-dom); useAuth (../context/AuthContext);
// styles (./Navbar.module.css)
function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        logout()
            .then(() => navigate('/'))
    }

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>🌙 Заметки</Link>

            <div className={styles.actions}>
                {user
                    ? (
                        <>
                            <Link to="/notes">Общие заметки</Link>
                            <Link to="/my-notes">Мои заметки</Link>
                            <span className={styles.email}>{user.email}</span>
                            <button onClick={handleLogout}>Выйти</button>
                        </>
                    )
                    : (
                        <>
                            <Link to="/login">Вход</Link>
                            <Link to="/register">Регистрация</Link>
                        </>
                    )
                }
            </div>
        </nav>
    )
}
export default Navbar
// Функция Navbar()
// - через useAuth() достаёт user и logout
// - через useNavigate() достаёт navigate
//
// Функция handleLogout() — асинхронный обработчик клика на "Выйти":
// - вызывает logout(), дожидается завершения
// - вызывает navigate('/login')

// return JSX:
//   <nav className={styles.navbar}>
//     <Link to="/" className={styles.logo}>🌙 Заметки</Link>
//
//     <div className={styles.actions}>
//       { user
//           ? (
//               <>
//                 <Link to="/notes">Общие заметки</Link>
//                 <Link to="/my-notes">Мои заметки</Link>
//                 <span className={styles.email}>{user.email}</span>
//                 <button onClick={handleLogout}>Выйти</button>
//               </>
//             )
//           : (
//               <>
//                 <Link to="/login">Вход</Link>
//                 <Link to="/register">Регистрация</Link>
//               </>
//             )
//       }
//     </div>
//   </nav>
