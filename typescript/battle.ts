import { input_1 } from "./welcome.js";
import { input_2 } from "./welcome.js";


// fetch the data from the API
export async function fetchData(topic_a: string, topic_b: string) {
    if (topic_a && topic_b) {
        const response_a = await fetch("/api/search/" + topic_a);
        const apiResponse_a = await response_a.json();

        const response_b = await fetch("/api/search/" + topic_b);
        const apiResponse_b = await response_b.json();

        console.log(apiResponse_a, apiResponse_b);

        document.getElementById("loading")?.classList.add("hide");
        document.getElementById("results")?.classList.add("show");

        const competitor_a = document.getElementById("competitor_a") as HTMLElement;
        const competitor_b = document.getElementById("competitor_b") as HTMLElement;
        const column_a = document.getElementById("column_a") as HTMLElement;
        const column_b = document.getElementById("column_b") as HTMLElement

        competitor_a.innerText = topic_a;
        competitor_b.innerText = topic_b;
        column_a.innerText = topic_a;
        column_b.innerText = topic_b;

        showStats(apiResponse_a.result, "a");
        showStats(apiResponse_b.result, "b");
        caclulateWinner();

        showArticles(apiResponse_a.result);
        showArticles(apiResponse_b.result);
    }

    // makeChart(apiResponse.result);
    // showStats(apiResponse.result);
}


type Article = {
    title: string;
    link: string;
    sentiment: {
        text: string;
        score: number;
    };
};


function showStats(articles: Article[], topic_key: string) {

    const tot_mentions_p = document.querySelector("#tot_mentions ." + topic_key + " p") as HTMLElement;
    const avg_sentiment_p = document.querySelector("#avg_sentiment ." + topic_key + " p") as HTMLElement;
    const tot_positive_p = document.querySelector("#tot_positive ." + topic_key + " p") as HTMLElement;
    const tot_negative_p = document.querySelector("#tot_negative ." + topic_key + " p") as HTMLElement;


    tot_mentions_p.innerText = articles.length.toString();

    const averageSentiment = articles.reduce(
        (acc, article) => acc + article.sentiment.score,
        0
    );
    avg_sentiment_p.innerText = (
        averageSentiment / articles.length
    ).toFixed(2);

    const positiveArticles = articles.filter(
        (article) => article.sentiment.text === "positive"
    );
    tot_positive_p.innerText =
        positiveArticles.length.toString();

    const negativeArticles = articles.filter(
        (article) => article.sentiment.text === "negative"
    );
    tot_negative_p.innerText =
        negativeArticles.length.toString();
}

function caclulateWinner() {
    let score_a = 0;
    let score_b = 0;

    const tot_mentions_elem_a = document.querySelector("#tot_mentions .a p") as HTMLElement;
    const tot_mentions_elem_b = document.querySelector("#tot_mentions .b p") as HTMLElement;

    // Get the total number of mentions for both topics
    const tot_mentions_a = parseInt(
        tot_mentions_elem_a.innerText
    );
    const tot_mentions_b = parseInt(
        tot_mentions_elem_b.innerText
    );
    // Compare and select a winner
    if (tot_mentions_a > tot_mentions_b) {
        document.querySelector("#tot_mentions .a")?.classList.add("winner");
        score_a += 5;
    } else if (tot_mentions_a < tot_mentions_b) {
        document.querySelector("#tot_mentions .b")?.classList.add("winner");
        score_b += 5;
    } else {
        document.querySelector("#tot_mentions .a")?.classList.add("tied");
        document.querySelector("#tot_mentions .b")?.classList.add("tied");
        score_a += 2.5;
        score_b += 2.5;
    }

    // Get the average sentiment of both topics

    const avg_sentiment_a_p = document.querySelector("#avg_sentiment .a p") as HTMLElement;
    const avg_sentiment_b_p = document.querySelector("#avg_sentiment .b p") as HTMLElement;

    const avg_sentiment_a = parseFloat(
        avg_sentiment_a_p?.innerText
    );
    const avg_sentiment_b = parseFloat(
        avg_sentiment_b_p?.innerText
    );
    // Compare and select a winner
    if (avg_sentiment_a > avg_sentiment_b) {
        document.querySelector("#avg_sentiment .a")?.classList.add("winner");
        score_a += 5;
    } else if (avg_sentiment_a < avg_sentiment_b) {
        document.querySelector("#avg_sentiment .b")?.classList.add("winner");
        score_b += 5;
    } else {
        document.querySelector("#avg_sentiment .a")?.classList.add("tied");
        document.querySelector("#avg_sentiment .b")?.classList.add("tied");
        score_a += 2.5;
        score_b += 2.5;
    }

    // Get the total number of positive articles for both topics

    const tot_positive_a_p = document.querySelector("#tot_positive .a p") as HTMLElement;
    const tot_positive_b_p = document.querySelector("#tot_positive .b p") as HTMLElement

    const tot_positive_a = parseInt(
        tot_positive_a_p?.innerText
    );
    const tot_positive_b = parseInt(
        tot_positive_b_p?.innerText
    );
    // Compare and select a winner
    if (tot_positive_a > tot_positive_b) {
        document.querySelector("#tot_positive .a")?.classList.add("winner");
        score_a += 5;
    } else if (tot_positive_a < tot_positive_b) {
        document.querySelector("#tot_positive .b")?.classList.add("winner");
        score_b += 5;
    } else {
        document.querySelector("#tot_positive .a")?.classList.add("tied");
        document.querySelector("#tot_positive .b")?.classList.add("tied");
        score_a += 2.5;
        score_b += 2.5;
    }

    // Get the total number of negative articles for both topics

    const tot_negative_a_p = document.querySelector("#tot_negative .a p") as HTMLElement;
    const tot_negative_b_p = document.querySelector("#tot_negative .b p") as HTMLElement

    const tot_negative_a = parseInt(
        tot_negative_a_p?.innerText
    );
    const tot_negative_b = parseInt(
        tot_negative_b_p?.innerText
    );
    // Compare and select a winner
    if (tot_negative_a < tot_negative_b) {
        document.querySelector("#tot_negative .a")?.classList.add("winner");
        score_a += 5;
    } else if (tot_negative_a > tot_negative_b) {
        document.querySelector("#tot_negative .b")?.classList.add("winner");
        score_b += 5;
    } else {
        document.querySelector("#tot_negative .a")?.classList.add("tied");
        document.querySelector("#tot_negative .b")?.classList.add("tied");
        score_a += 2.5;
        score_b += 2.5;
    }

    // Calculate the winner

    const tot_score_elem_a = document.querySelector("#tot_score .a p") as HTMLElement;
    const tot_score_elem_b = document.querySelector("#tot_score .b p") as HTMLElement;

    tot_score_elem_a.innerText = score_a.toString();
    tot_score_elem_b.innerText = score_b.toString();

    const winner_name = document.getElementById("winner_name") as HTMLElement;


    const urlParams = new URLSearchParams(window.location.search);
    if (score_a > score_b) {
        document.querySelector("#tot_score .a")?.classList.add("winner");
        winner_name.innerText = input_1.value;
    } else if (score_a < score_b) {
        document.querySelector("#tot_score .b")?.classList.add("winner");
        winner_name.innerText = input_2.value;
    } else {
        document.querySelector("#tot_score .a")?.classList.add("tied");
        document.querySelector("#tot_score .b")?.classList.add("tied");
        winner_name.innerText = "TIED";
    }
}

function showArticles(articles: Article[]) {
    const articlesContainer = document.getElementById("articles_list") as HTMLElement;

    articles.forEach((article) => {
        const articleElement = document.createElement("a");
        articleElement.classList.add("article");
        articleElement.setAttribute("href", article.link);
        articleElement.setAttribute("target", "_blank");
        articleElement.innerText = article.title;
        articlesContainer.appendChild(articleElement);
    });
}

// if query params are set in the URL, convert them to input values
const urlParams = new URLSearchParams(window.location.search);
const topic_1 = urlParams.get("topic_a");
const topic_2 = urlParams.get("topic_b");
if (topic_1 && topic_2) {
    input_1.value = topic_1;
    input_2.value = topic_2;

    document.getElementById("part_1")?.classList.add("remove");
    document.getElementById("part_2")?.classList.add("show");
    fetchData(input_1.value, input_2.value);
}
