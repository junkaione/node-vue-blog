export function formatTime(date, type) {
  let d = new Date(date)
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let day = d.getDate()
  let hour = d.getHours()
  let minute = d.getMinutes()
  let second = d.getSeconds()
  if (type === "s") {
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
}