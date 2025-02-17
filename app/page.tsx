import NewsAPI from "./component/NewsApi";
import Ranking from "./component/Ranking";
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json'; // amplify_outputs.json のパスを確認
Amplify.configure(outputs); // Amplifyの設定を行う

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
        const req = await fetch(`${process.env.NEWS_API_URL}?q=bitcoin&language=en&pageSize=25&sortBy=poularity&apiKey=${process.env.NEWS_API_KEY}`);
        const res = await req.json();
        return res.articles || [];
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
      <NewsAPI data={news}/>
      <Ranking data={ranking} />
    </>

  );
}
