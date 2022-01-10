// 时间戳转时间（yyyy-MM-dd HH:mm:ss）
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const YY = `${date.getFullYear()}-`;
  const MM = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  const DD = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const hh = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:`;
  const mm = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:`;
  const ss = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return `${YY + MM + DD} ${hh}${mm}${ss}`;
};

// // 时间转时间戳
// 时间戳 = Math.round(new Date(时间) / 1000);
