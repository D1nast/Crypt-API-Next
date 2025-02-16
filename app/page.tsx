import News from "./lpcomponent/NewsApi";
import Ranking from "./lpcomponent/ssrRanking";

// データを取得する非同期関数
async function fetchData() {
  try {
    const req = await fetch("https://api.coincap.io/v2/assets?limit=30");
    const res = await req.json();
    return res.data || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function LP() {
  const data = await fetchData(); // データを取得
  return (
    <>
      <News />
      <Ranking data={data} />
    </>
  );
}
