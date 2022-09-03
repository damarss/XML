async function getNews(url) {
  return fetch(url)
    .then((response) => response.text())
    .then((str) => new DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      return data.querySelector("channel");
    });
}

async function getGempa(url) {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
}

async function loadNews() {
  const url = [
    "https://coconuts.co/jakarta/feed/",
    "https://lapi.kumparan.com/v2.0/rss/",
    "https://www.cnnindonesia.com/ekonomi/rss"
  ];
  let news = [];
  let source = "";
  for (let i = 0; i < url.length; i++) {
    news[i] = await getNews(url[i]);
    console.log(news[i]);
    source = news[i].querySelector("image").querySelector("url").textContent;
    // document.write(`<img src='${source}' width='50' />`);
    document.getElementById(`news-${i+1}`).innerHTML = `<img src='${source}' width='50' />` + 
    `<p>${news[i].querySelector("title").innerHTML}</p>`;
  }

}

async function loadGempa() {
  const url = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";
  const gempa = await getGempa(url);
  console.log(gempa);
}