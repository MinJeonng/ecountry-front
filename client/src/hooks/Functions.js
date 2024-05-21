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
