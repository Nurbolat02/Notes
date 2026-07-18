// ==================== pages/AllNotesPage.jsx ====================
// Страница со всеми заметками всех юзеров (только просмотр).

import { useEffect, useState } from 'react'
import { api } from '../api/api'
import NoteCard from '../components/NoteCard'
import styles from './AllNotesPage.module.css'
// Импорты: useEffect, useState (react); api (../api/api); NoteCard (../components/NoteCard); styles
function AllNotesPage() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        api.getNotes().then((result) => setNotes(result))

    }, [])

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Общие заметки</h1>

            <div className={styles.list}>
                {notes.length === 0 && <p className={styles.empty}>Заметок пока нет</p>}

                {notes.map((note) => (
                    <NoteCard key={note.id} note={note} canManage={false} />
                ))
                }
            </div>
        </div>
    )
}
export default AllNotesPage
// Функция AllNotesPage()
//
// Состояние:
// - notes — список заметок, изначально пустой массив
//
// При первом рендере (эффект без зависимостей) — через api.getNotes() загружает список
// и кладёт в notes

// return JSX:
//   <div className={styles.page}>
//     <h1 className={styles.title}>Общие заметки</h1>
//
//     <div className={styles.list}>
//       { notes.length === 0 && <p className={styles.empty}>Заметок пока нет</p> }
//
//       { notes.map((note) => (
//           <NoteCard key={note.id} note={note} canManage={false} />
//         ))
//       }
//     </div>
//   </div>
