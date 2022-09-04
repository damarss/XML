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
    .then((data) => {
      return data.Infogempa.gempa;
    });
}

async function loadNews() {
  const url = [
    "https://www.cnnindonesia.com/ekonomi/rss",
    "https://www.cnbcindonesia.com/market/rss/",
    "https://lapi.kumparan.com/v2.0/rss/",
  ];
  let news = [];

  for (let i = 0; i < url.length; i++) {
    news[i] = await getNews(url[i]);
    let imgSource = news[i]
      .querySelector("image")
      .querySelector("url").textContent;
    let rss = news[i].querySelector("title").innerHTML;
    let rssDescription = news[i].querySelector("description").innerHTML;
    let itemBerita = news[i].querySelectorAll("item");

    document.getElementById(`banner-${i + 1}`).src = imgSource;
    document.getElementById(`banner-${i + 1}`).alt = imgSource;
    document
      .getElementById(`rss-${i + 1}`)
      .querySelector("h5.card-title").innerText = rss;
    document
      .getElementById(`rss-${i + 1}`)
      .querySelector("p.card-text").innerText = rssDescription;

    for (let j = 0; j < 3; j++) {
      let title = itemBerita[j].querySelector("title").innerHTML;
      let description = itemBerita[j].querySelector("description").innerHTML;
      let itemImage = itemBerita[j]
        .querySelector("enclosure")
        .getAttribute("url");
      let link = itemBerita[j].querySelector("link").innerHTML;
      let date = itemBerita[j].querySelector("pubDate").innerHTML;
      date = new Date(date);
      let formattedDate = date.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      title = title.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "");
      description = description
        .replace(/<!\[CDATA\[/g, "")
        .replace(/\]\]>/g, "")
        .replace(/<img[^>]*>/g, "");

      document
        .getElementById(`rss-${i + 1}`)
        .querySelector(".news-item")
        .querySelectorAll("img")[j].src = itemImage;
      document
        .getElementById(`rss-${i + 1}`)
        .querySelector(".news-item")
        .querySelectorAll("h5.card-title")[j].innerText = title;
      document
        .getElementById(`rss-${i + 1}`)
        .querySelector(".news-item")
        .querySelectorAll("p.card-text")[j].innerText = description;
      document
        .getElementById(`rss-${i + 1}`)
        .querySelector(".news-item")
        .querySelectorAll("a")[j].href = link;
      document
        .getElementById(`rss-${i + 1}`)
        .querySelector(".news-item")
        .querySelectorAll("a")[j].target = "_blank";
      document
        .getElementById(`rss-${i + 1}`)
        .querySelector(".news-item")
        .querySelectorAll("small")[j].innerHTML = formattedDate;
    }
  }
}

async function loadGempa() {
  const url = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";
  const gempa = await getGempa(url);
  let imgSource = "https://data.bmkg.go.id/DataMKG/TEWS/" + gempa.Shakemap;
  const atribut = document
    .getElementById("gempa")
    .querySelectorAll(".list-group-item");

  document.getElementById("gempa").querySelector("img").src = imgSource;
  document.getElementById("gempa").querySelector(".card-text").innerText =
    gempa.Wilayah;
  atribut[0].innerHTML = `<i class="bi bi-geo-alt-fill"></i> ${gempa.Dirasakan}`;
  atribut[1].innerHTML = `<i class="bi bi-bullseye"></i> ${gempa.Potensi}`;
  atribut[2].innerHTML = `<i class="bi bi-arrow-down-circle-fill"></i> Kedalaman ${gempa.Kedalaman}`;
  atribut[3].innerHTML = `<i class="bi bi-calendar-event-fill"></i> ${gempa.Tanggal}`;
  atribut[4].innerHTML = `<i class="bi bi-clock-fill"></i> ${gempa.Jam}`;
  atribut[5].innerHTML = `<i class="bi bi-compass-fill"></i> ${gempa.Coordinates}`;
  atribut[6].innerHTML = `<i class="bi bi-map-fill"></i> ${gempa.Lintang} & ${gempa.Bujur}`;
}
