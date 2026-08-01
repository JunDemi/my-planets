export const subscribeToHash = (callback: () => void) => {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
};

export const getHashSnapshot = () => window.location.hash.slice(1);
export const getServerHashSnapshot = () => '';

export const datetimeFormat = (millisecond: number) => {
  // 밀리초를 Date 객체로 변환
  const date = new Date(millisecond);
  // 년, 월, 일, 시간, 분, 초 정보 추출
  const year = date.getFullYear().toString().slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  // yyyy-mm-dd, hh-mm-ss 형식으로 날짜와 시간 포맷팅
  return `${year}년 ${month}월 ${day}일, ${hours}시 ${minutes}분`;
};

export const compareTimeFormat = (millisecond: number) => {
  const minute = Math.floor((Number(Date.now()) - Number(millisecond)) / 60000);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);
  const month = Math.floor(day / 31);
  const year = Math.floor(month / 12);
  if (minute < 5) {
    return '방금';
  } else if (minute < 60) {
    return minute + '분 전';
  } else if (hour < 24) {
    return hour + '시간 전';
  } else if (day < 31) {
    return day + '일 전';
  } else if (month < 12) {
    return month + '달 전';
  } else if (month > 12) {
    return year + '년 전';
  }
};
