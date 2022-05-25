export const formatDate = gmt => {
  let date = new Date(gmt)
  let m = (date.getMonth() + 1), mm = '-' + (m < 10 ? '0' + m : m)
  let d = date.getDate(), dd = '-' + (d < 10 ? '0' + d : d)
  let h = date.getHours(), hh = ' ' +(h < 10 ? '0' + h : h)
  let i = date.getMinutes(), ii = ':' +(i < 10 ? '0' + i : i)
  let s = date.getSeconds(), ss = ':' +(s < 10 ? '0' + s : s)
  return date.getFullYear() + mm + dd + hh + ii + ss
}