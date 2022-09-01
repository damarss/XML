function getNews() {
  const result = document.getElementById("result");
  let url = "https://lapi.kumparan.com/v2.0/rss/";
  fetch(url)
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      console.log(data)
      console.log(data.getElementsByTagName("rss")[0]);
    });
}

function getGempa() {
  const url = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";
  fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
}