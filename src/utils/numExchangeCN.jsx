/**
 * 数字转成汉字
 * @params num === 要转换的数字
 * @return 汉字
 * */
export const toChinesNum = (number) => {
  const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const unit = ['', '十', '百', '千', '万'];
  // eslint-disable-next-line radix
  const num = parseInt(number);
  const getWan = (temp) => {
    const strArr = temp.toString().split('').reverse();
    let newNum = '';
    const newArr = [];
    strArr.forEach((item, index) => {
      newArr.unshift(item === '0' ? changeNum[item] : changeNum[item] + unit[index]);
    });
    const numArr = [];
    newArr.forEach((m, n) => {
      if (m !== '零') numArr.push(n);
    });
    if (newArr.length > 1) {
      newArr.forEach((m, n) => {
        if (newArr[newArr.length - 1] === '零') {
          if (n <= numArr[numArr.length - 1]) {
            newNum += m;
          }
        } else {
          newNum += m;
        }
      });
    } else {
      // eslint-disable-next-line prefer-destructuring
      newNum = newArr[0];
    }

    return newNum;
  };
  const overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) {
    noWan = `0${noWan}`;
  }
  return overWan ? `${getWan(overWan)}万${getWan(noWan)}` : getWan(num);
};
