const formatTime = (str)=>{
  const date = new Date(str*1000);
  const y = ""+1900 + date.getYear();
  const m = "0" + (date.getMonth() + 1);
  const d = "0" + date.getDate();
  const h = "0" + date.getHours();
  const minutes = "0" + date.getMinutes();
  const sec = "0" + date.getSeconds();
  return m.substring(m.length - 2, m.length) + "/"+d.substring(d.length - 2, d.length)+" "+h.substring(h.length-2,h.length)+":"+minutes.substring(minutes.length-2,minutes.length)+":"+sec.substring(sec.length-2,sec.length);
}

export default formatTime;