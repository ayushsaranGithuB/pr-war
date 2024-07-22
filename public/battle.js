// fetch the data from the API
async function fetchData() {
  // Get query parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const topic_a = urlParams.get("topic_a");
  const topic_b = urlParams.get("topic_b");

  if (topic_a && topic_b) {
    const response_a = await fetch("/api/search/" + topic_a);
    const apiResponse_a = await response_a.json();

    const response_b = await fetch("/api/search/" + topic_b);
    const apiResponse_b = await response_b.json();

    console.log(apiResponse_a, apiResponse_b);

    document.getElementById("loading").style.display = "none";
    document.getElementById("results").style.display = "grid";

    showStats(apiResponse_a.result, "a");
    showStats(apiResponse_b.result, "b");
    caclulateWinner();

    showArticles(apiResponse_a.result);
    showArticles(apiResponse_b.result);
  }

  // makeChart(apiResponse.result);
  // showStats(apiResponse.result);
}

function showStats(articles, topic_key) {
  document.querySelector("#tot_mentions ." + topic_key + " p").innerText =
    articles.length;

  const averageSentiment = articles.reduce(
    (acc, article) => acc + article.sentiment.score,
    0
  );
  document.querySelector("#avg_sentiment ." + topic_key + " p").innerText = (
    averageSentiment / articles.length
  ).toFixed(2);

  const positiveArticles = articles.filter(
    (article) => article.sentiment.text === "positive"
  );
  document.querySelector("#tot_positive ." + topic_key + " p").innerText =
    positiveArticles.length;

  const negativeArticles = articles.filter(
    (article) => article.sentiment.text === "negative"
  );
  document.querySelector("#tot_negative ." + topic_key + " p").innerText =
    negativeArticles.length;
}

function caclulateWinner() {
  let score_a = 0;
  let score_b = 0;

  // Get the total number of mentions for both topics
  const tot_mentions_a = parseInt(
    document.querySelector("#tot_mentions .a p").innerText
  );
  const tot_mentions_b = parseInt(
    document.querySelector("#tot_mentions .b p").innerText
  );
  // Compare and select a winner
  if (tot_mentions_a > tot_mentions_b) {
    document.querySelector("#tot_mentions .a").classList.add("winner");
    score_a += 5;
  } else if (tot_mentions_a < tot_mentions_b) {
    document.querySelector("#tot_mentions .b").classList.add("winner");
    score_b += 5;
  } else {
    document.querySelector("#tot_mentions .a").classList.add("tied");
    document.querySelector("#tot_mentions .b").classList.add("tied");
    score_a += 2.5;
    score_b += 2.5;
  }

  // Get the average sentiment of both topics
  const avg_sentiment_a = parseFloat(
    document.querySelector("#avg_sentiment .a p").innerText
  );
  const avg_sentiment_b = parseFloat(
    document.querySelector("#avg_sentiment .b p").innerText
  );
  // Compare and select a winner
  if (avg_sentiment_a > avg_sentiment_b) {
    document.querySelector("#avg_sentiment .a").classList.add("winner");
    score_a += 5;
  } else if (avg_sentiment_a < avg_sentiment_b) {
    document.querySelector("#avg_sentiment .b").classList.add("winner");
    score_b += 5;
  } else {
    document.querySelector("#avg_sentiment .a").classList.add("tied");
    document.querySelector("#avg_sentiment .b").classList.add("tied");
    score_a += 2.5;
    score_b += 2.5;
  }

  // Get the total number of positive articles for both topics
  const tot_positive_a = parseInt(
    document.querySelector("#tot_positive .a p").innerText
  );
  const tot_positive_b = parseInt(
    document.querySelector("#tot_positive .b p").innerText
  );
  // Compare and select a winner
  if (tot_positive_a > tot_positive_b) {
    document.querySelector("#tot_positive .a").classList.add("winner");
    score_a += 5;
  } else if (tot_positive_a < tot_positive_b) {
    document.querySelector("#tot_positive .b").classList.add("winner");
    score_b += 5;
  } else {
    document.querySelector("#tot_positive .a").classList.add("tied");
    document.querySelector("#tot_positive .b").classList.add("tied");
    score_a += 2.5;
    score_b += 2.5;
  }

  // Get the total number of negative articles for both topics
  const tot_negative_a = parseInt(
    document.querySelector("#tot_negative .a p").innerText
  );
  const tot_negative_b = parseInt(
    document.querySelector("#tot_negative .b p").innerText
  );
  // Compare and select a winner
  if (tot_negative_a < tot_negative_b) {
    document.querySelector("#tot_negative .a").classList.add("winner");
    score_a += 5;
  } else if (tot_negative_a > tot_negative_b) {
    document.querySelector("#tot_negative .b").classList.add("winner");
    score_b += 5;
  } else {
    document.querySelector("#tot_negative .a").classList.add("tied");
    document.querySelector("#tot_negative .b").classList.add("tied");
    score_a += 2.5;
    score_b += 2.5;
  }

  // Calculate the winner

  document.querySelector("#tot_score .a p").innerText = score_a;
  document.querySelector("#tot_score .b p").innerText = score_b;
  const urlParams = new URLSearchParams(window.location.search);
  if (score_a > score_b) {
    document.querySelector("#tot_score .a").classList.add("winner");
    document.getElementById("winner_name").innerText = urlParams.get("topic_a");
  } else if (score_a < score_b) {
    document.querySelector("#tot_score .b").classList.add("winner");
    document.getElementById("winner_name").innerText = urlParams.get("topic_a");
  } else {
    document.querySelector("#tot_score .a").classList.add("tied");
    document.querySelector("#tot_score .b").classList.add("tied");
    document.getElementById("winner_name").innerText = "TIED";
  }
}

function showArticles(articles) {
  const articlesContainer = document.getElementById("articles_list");

  articles.forEach((article) => {
    const articleElement = document.createElement("a");
    articleElement.classList.add("article");
    articleElement.setAttribute("href", article.link);
    articleElement.setAttribute("target", "_blank");
    articleElement.innerText = article.title;
    articlesContainer.appendChild(articleElement);
  });
}

// on load
// setTimeout(() => {
fetchData();
// }, 1000);
