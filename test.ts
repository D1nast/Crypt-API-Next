// 日付を「YYYY-MM-DD」の形式に変換するヘルパー関数
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月を2桁に
    const day = String(date.getDate()).padStart(2, '0'); // 日を2桁に
    return `${year}-${month}-${day}`;
  };
  
  // 1日前の日付を取得
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  
  // 今日の日付を取得
  const today = new Date();
  
  // フォーマットされた日付を取得
  const oneago = formatDate(oneDayAgo);
  const todayFormatted = formatDate(today);
  
  console.log(oneago);
  console.log(todayFormatted);