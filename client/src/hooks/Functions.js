export function GetTimeText(time) {
  const newTime = new Date(time);
  const translateTime = () => {
    if (newTime.getHours() > 12) {
      return `오후 ${(newTime.getHours() - 12).toString().padStart(2, '0')}`;
    } else {
      return `오전 ${newTime.getHours().toString().padStart(2, '0')}`;
    }
  };
  return `${newTime.getFullYear()}. ${newTime.getMonth()}. ${newTime.getDate()} ${translateTime()}:${newTime.getMinutes()}`;
}

export function getThumbnail(html) {
  if (html.includes('<img src="')) {
    const [_, start] = html.split('<img src="');
    const [imgUrl, __] = start.split('">');
    return imgUrl;
  }
  return '/images/defaultImg.jpg';
}

export const htmlToText = (html) => {
  let newHtml = html;
  while (newHtml.includes('<')) {
    const s = newHtml.indexOf('<');
    const e = newHtml.indexOf('>') + 1;
    const subString = newHtml.slice(s, e);
    newHtml = newHtml.replaceAll(subString, '');
  }
  return newHtml;
};

export const getOnlyTime = (time) => {
  if (time === '') {
    return '';
  }
  const newTime = new Date(time);
  let result;
  if (newTime.getHours() > 12) {
    result = `오후 ${(newTime.getHours() - 12)
      .toString()
      .padStart(2, '0')}:${newTime.getMinutes()}`;
  } else {
    result = `오전 ${newTime
      .getHours()
      .toString()
      .padStart(2, '0')}:${newTime.getMinutes()}`;
  }
  return result;
};

export const compareTime = (prevTime, nowTime) => {
  const prevDate = new Date(prevTime);
  const nowDate = new Date(nowTime);
  if (
    prevDate.getFullYear() === nowDate.getFullYear() &&
    prevDate.getMonth() === nowDate.getMonth() &&
    prevDate.getDate() === nowDate.getDate() &&
    prevDate.getHours() === nowDate.getHours() &&
    prevDate.getMinutes() === nowDate.getMinutes()
  ) {
    return true;
  } else {
    return false;
  }
};

export const getOnlyDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getMonth() + 1}월 ${newDate.getDate()}일`;
};

export const handleKeyDownNext = (e, refName) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    refName.current.focus();
  }
};

export const handleKeyDown = (e, func) => {
  if (e.key === 'Enter') {
    func();
  }
};
