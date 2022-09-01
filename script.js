function getNews() {
  const result = document.getElementById("result");
  let url = "https://www.antaranews.com/rss/top-news";
  fetch(url)
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      console.log(data)
      console.log(data.getElementsByTagName("rss")[0]);
    });
}

getNews();
