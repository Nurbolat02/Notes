// ==================== components/NoteCard.jsx ====================

// Импорты: styles (./NoteCard.module.css); formatDate (../utils/formatDate)
import styles from './NoteCard.module.css'
import formatDate from '../utils/formatDate'

function NoteCard({ note, canManage, onEdit, onDelete }) {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{note.title}</h3>
            <p className={styles.text}>{note.text}</p>

            {note.user && (
                <p className={styles.meta}>
                    Автор: {note.user.email}
                    <br />
                    Создано: {formatDate(note.createdAt)}
                </p>
            )}

            {canManage && (
                <div className={styles.footer}>
                    <button className={styles.editButton} onClick={() => onEdit(note)}>
                        Редактировать
                    </button>
                    <button className={styles.deleteButton} onClick={() => onDelete(note.id)}>
                        Удалить
                    </button>
                </div>
            )}
        </div>
    )
}
export default NoteCard
// Функция NoteCard({ note, canManage, onEdit, onDelete })
// - note — сама заметка
// - canManage — можно ли редактировать/удалять
// - onEdit(note) / onDelete(id) — колбэки от родителя

// return JSX:
//   <div className={styles.card}>
//     <h3 className={styles.title}>{note.title}</h3>
//     <p className={styles.text}>{note.text}</p>
//
//     { note.user && (
//       <p className={styles.meta}>
//         Автор: {note.user.email}
//         <br />
//         Создано: {formatDate(note.createdAt)}
//       </p>
//     )}
//
//     { canManage && (
//       <div className={styles.footer}>
//         <button className={styles.editButton} onClick={() => onEdit(note)}>
//           Редактировать
//         </button>
//         <button className={styles.deleteButton} onClick={() => onDelete(note.id)}>
//           Удалить
//         </button>
//       </div>
//     )}
//   </div>
