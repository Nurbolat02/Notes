// ==================== pages/MyNotesPage.jsx ====================
// Страница только со своими заметками — можно создавать/редактировать/удалять.
import { useEffect, useState } from 'react';
import { api } from '../api/api'
import { useAuth } from '../context/AuthContext'
import NoteCard from '../components/NoteCard'
import NoteForm from '../components/NoteForm'
import styles from './MyNotesPage.module.css'
// Импорты: useEffect, useState (react); api (../api/api); useAuth (../context/AuthContext);
// NoteCard (../components/NoteCard); NoteForm (../components/NoteForm); styles

function MyNotesPage() {
    const { user } = useAuth();
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    async function loadNotes() {
        const respond = await api.getMyNotes()
        setNotes(respond)
    }
    async function handleCreate(title, text) { // вызывается формой при создании новой заметки
        const note = await api.createNote(title, text) // сервер создаёт заметку и возвращает её
        setNotes((prev) => [...prev, { ...note, userId: user.id }]) // добавляем в список; userId дописываем вручную для мгновенной проверки владения на фронте
    }
    async function handleUpdate(title, text) {
        const updated = await api.updateNote(editingNote.id, title, text);
        setNotes((prev) => prev.map((element) => element.id === updated.id ? updated : element))
        setEditingNote(null)
    }
    async function handleDelete(id) {
        await api.deleteNote(id)
        setNotes((prev) => prev.filter((element) => element.id !== id))
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Мои заметки</h1>

            {editingNote
                ? (
                    <NoteForm
                        key={editingNote.id}
                        initialTitle={editingNote.title}
                        initialText={editingNote.text}
                        submitLabel="Сохранить"
                        onSubmit={handleUpdate}
                        onCancel={() => setEditingNote(null)}
                    />
                )
                : (
                    <NoteForm key="create" submitLabel="Добавить заметку" onSubmit={handleCreate} />
                )
            }

            <div className={styles.list}>
                {notes.length === 0 && <p className={styles.empty}>У тебя пока нет заметок</p>}

                {notes.map((note) => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        canManage
                        onEdit={setEditingNote}
                        onDelete={handleDelete}
                    />
                ))
                }
            </div>
        </div>
    )
}
export default MyNotesPage
// Функция MyNotesPage()
//
// Через useAuth() достаёт user
//
// Состояние:
// - notes — список своих заметок
// - editingNote — заметка, которая сейчас редактируется (null — форма создания)
//
// При первом рендере (эффект без зависимостей) — вызывает loadNotes()

// Функция loadNotes() — асинхронная:
// - через api.getMyNotes() получает данные, кладёт в notes

// Функция handleCreate(title, text) — асинхронная, вызывается формой при создании:
// - через api.createNote(title, text) получает note
// - добавляет note в notes; дописывает note.userId = user.id вручную

// Функция handleUpdate(title, text) — асинхронная, вызывается формой при сохранении:
// - через api.updateNote(editingNote.id, title, text) получает updated
// - заменяет в notes заметку с тем же id на updated
// - сбрасывает editingNote в null

// Функция handleDelete(id) — асинхронная, вызывается кнопкой "Удалить":
// - вызывает api.deleteNote(id)
// - убирает из notes заметку с этим id

// return JSX:
//   <div className={styles.page}>
//     <h1 className={styles.title}>Мои заметки</h1>
//
//     { editingNote
//         ? (
//             <NoteForm
//               key={editingNote.id}
//               initialTitle={editingNote.title}
//               initialText={editingNote.text}
//               submitLabel="Сохранить"
//               onSubmit={handleUpdate}
//               onCancel={() => setEditingNote(null)}
//             />
//           )
//         : (
//             <NoteForm key="create" submitLabel="Добавить заметку" onSubmit={handleCreate} />
//           )
//     }
//
//     <div className={styles.list}>
//       { notes.length === 0 && <p className={styles.empty}>У тебя пока нет заметок</p> }
//
//       { notes.map((note) => (
//           <NoteCard
//             key={note.id}
//             note={note}
//             canManage
//             onEdit={setEditingNote}
//             onDelete={handleDelete}
//           />
//         ))
//       }
//     </div>
//   </div>
