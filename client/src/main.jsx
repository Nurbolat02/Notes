import { StrictMode } from 'react' // StrictMode — обёртка React, которая в разработке дважды вызывает рендер, чтобы ловить побочные эффекты
import { createRoot } from 'react-dom/client' // createRoot — способ подключить React-приложение к реальному DOM-узлу браузера
import './index.css' // подключаем глобальные стили — они применяются ко всему приложению
import App from './App.jsx' // главный компонент приложения, откуда начинается всё дерево страниц

createRoot(document.getElementById('root')).render( // находим <div id="root"> в index.html и рендерим туда React
    <StrictMode>
        <App />
    </StrictMode>,
)
