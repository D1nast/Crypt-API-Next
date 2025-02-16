import News from "./lpcomponent/NewsApi";
import Ranking from "./lpcomponent/Ranking";

// 日付を「YYYY-MM-DD」の形式に変換するヘルパー関数
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月を2桁に
    const day = String(date.getDate()).padStart(2, '0'); // 日を2桁に
    return `${year}-${month}-${day}`;
  };
const oneDayAgo = new Date();
oneDayAgo.setDate(oneDayAgo.getDate() - 1);  
const today = new Date();
const oneago = formatDate(oneDayAgo);
const todayFormatted = formatDate(today);


// ランキングを取得
async function fetchRanking() {
  try {
    const req = await fetch("https://api.coincap.io/v2/assets?limit=30");
    const res = await req.json();
    return res.data || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// ニュースを取得
async function fetchNews(){
    try{ 
        const req = await fetch(`${process.env.NEWS_API_URL}&from=${oneago}&to=${todayFormatted}&language=en&pageSize=25&sortBy=poularity&apiKey=${process.env.NEWS_API_KEY}`)
        const res = await req.json();
        return res.data || [];
    }  
    catch (error){
        console.log("Error fetching data:",error);
        return [];
    }
}

export default async function LP() {
  const ranking = await fetchRanking();
  const news = await fetchNews();
  return (
    <>
      <News data={news}/>
      <Ranking data={ranking} />
    </>

  );
}
