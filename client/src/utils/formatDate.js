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
function formatDate(isoString){
    const date = new Date(isoString),
    day = toString(date.getDay).padStart(2, '0'),
    month = toString(date.getMonth+1).padStart(2,'0'),
    year = toString(date.getFullYear),
    hours = toString(date.getHours).padStart(2,'0'),
    minutes = toString(date.getMinutes).padStart(2,'0');
    return `${day}.${month}.${year} ${hours}:${minutes}`
}
export default formatDate