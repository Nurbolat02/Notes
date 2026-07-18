// ==================== App.jsx ====================

// Импорты: BrowserRouter, Routes, Route, Navigate (react-router-dom) — роутинг;
// AuthProvider, useAuth (./context/AuthContext) — провайдер авторизации и хук чтения юзера;
// Navbar (./components/Navbar) — шапка сайта;
// ProtectedRoute (./components/ProtectedRoute) — обёртка для защищённых страниц;
// LoginPage, RegisterPage, AllNotesPage, MyNotesPage (./pages/*)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' // инструменты роутинга: сам роутер, список маршрутов, один маршрут, редирект
import { AuthProvider, useAuth } from './context/AuthContext' // провайдер авторизации (оборачивает всё приложение) и хук, чтобы читать текущего юзера
import Navbar from './components/Navbar' // шапка сайта с навигацией, видна на всех страницах
import ProtectedRoute from './components/ProtectedRoute' // обёртка, которая не пускает неавторизованных на страницу
import LoginPage from './pages/LoginPage' // страница входа
import RegisterPage from './pages/RegisterPage' // страница регистрации
import AllNotesPage from './pages/AllNotesPage' // страница со всеми заметками всех юзеров
import MyNotesPage from './pages/MyNotesPage' // страница только со своими заметками

function RootRedirect() {
    const { user, loading } = useAuth();
    if (loading) {
        return null
    }
    return <Navigate to={user ? '/my-notes' : '/login'} replace ></Navigate>
}
// Функция RootRedirect() — решает, куда перекинуть юзера с адреса "/":
// - через useAuth() достаёт user и loading
// - пока loading — ничего не показывает
// - иначе return JSX:
//     <Navigate to={user ? '/my-notes' : '/login'} replace />
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<RootRedirect />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/notes"
                        element={
                            <ProtectedRoute>
                                <AllNotesPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-notes"
                        element={
                            <ProtectedRoute>
                                <MyNotesPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}
export default App
// Функция App() — корневой компонент всего приложения
// return JSX:
//   <BrowserRouter>
//     <AuthProvider>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<RootRedirect />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route
//           path="/notes"
//           element={
//             <ProtectedRoute>
//               <AllNotesPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/my-notes"
//           element={
//             <ProtectedRoute>
//               <MyNotesPage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </AuthProvider>
//   </BrowserRouter>

// export default App
