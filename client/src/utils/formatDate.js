// ==================== utils/formatDate.js ====================

// Функция formatDate(isoString) — принимает ISO-строку даты (так её присылает сервер),
// возвращает строку вида "ДД.ММ.ГГГГ ЧЧ:ММ"
//
// Локальные переменные:
// - date — распарсенный объект даты из isoString
// - day — число месяца, с ведущим нулём
// - month — номер месяца с поправкой (в JS месяцы считаются от 0), с ведущим нулём
// - year — год четырьмя цифрами
// - hours — часы с ведущим нулём
// - minutes — минуты с ведущим нулём
//
// Возвращает строку, собранную из day, month, year, hours, minutes
function formatDate(isoString) {
    const date = new Date(isoString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day}.${month}.${year} ${hours}:${minutes}`
}
export default formatDate