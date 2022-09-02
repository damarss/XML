function getNews() {
  const result = document.getElementById("result");
  let url = "https://lapi.kumparan.com/v2.0/rss/";
  fetch(url, {
    method: "GET",
    // credentials: "include"
  })
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      console.log(data)
      console.log(data.getElementsByTagName("rss")[0]);
    });
}

function getGempa() {
  const url = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS, TRACE, CONNECT',
      'Access-Control-Allow-Credentials': 'false',

    }
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
}