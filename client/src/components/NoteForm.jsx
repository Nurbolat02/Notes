// ==================== components/NoteForm.jsx ====================
// Используется и для создания новой заметки, и для редактирования существующей — решает родитель через пропсы.
import { useState } from 'react';
import styles from './NoteForm.module.css';

// Импорты: useState (react); styles (./NoteForm.module.css)
function NoteForm({ initialTitle = '', initialText = '', submitLabel, onSubmit, onCancel }) {
    const [title, setTitle] = useState(initialTitle)
    const [text, setText] = useState(initialText)
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        try {
            await onSubmit(title, text)
            setTitle('')
            setText('')
        } catch (error) {
            setError(error.message)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className={styles.textarea}
                placeholder="Текст заметки"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.actions}>
                <button type="submit" disabled={submitting}>{submitLabel}</button>
                {onCancel && (
                    <button type="button" className={styles.cancelButton} onClick={onCancel}>
                        Отмена
                    </button>
                )}
            </div>
        </form>
    )
}
export default NoteForm
// Функция NoteForm({ initialTitle = '', initialText = '', submitLabel, onSubmit, onCancel })
//
// Состояние:
// - title — текущее значение поля заголовка, изначально initialTitle
// - text — текущее значение поля текста, изначально initialText
// - error — текст ошибки от сервера
// - submitting — идёт ли сейчас отправка

// Функция handleSubmit(e) — асинхронный обработчик отправки формы:
// - вызывает e.preventDefault()
// - сбрасывает error, включает submitting
// - вызывает onSubmit(title, text)
//   - при успехе — очищает title и text
//   - при ошибке — кладёт err.message в error
// - в конце выключает submitting

// return JSX:
//   <form className={styles.form} onSubmit={handleSubmit}>
//     <input
//       type="text"
//       placeholder="Заголовок"
//       value={title}
//       onChange={(e) => setTitle(e.target.value)}
//     />
//     <textarea
//       className={styles.textarea}
//       placeholder="Текст заметки"
//       value={text}
//       onChange={(e) => setText(e.target.value)}
//     />
//
//     { error && <p className={styles.error}>{error}</p> }
//
//     <div className={styles.actions}>
//       <button type="submit" disabled={submitting}>{submitLabel}</button>
//       { onCancel && (
//         <button type="button" className={styles.cancelButton} onClick={onCancel}>
//           Отмена
//         </button>
//       )}
//     </div>
//   </form>
