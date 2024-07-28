var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
import { input_1 } from "./welcome.js";
import { input_2 } from "./welcome.js";
// fetch the data from the API
export function fetchData(topic_a, topic_b) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (topic_a && topic_b) {
            const response_a = yield fetch("/api/search/" + topic_a);
            const apiResponse_a = yield response_a.json();
            const response_b = yield fetch("/api/search/" + topic_b);
            const apiResponse_b = yield response_b.json();
            console.log(apiResponse_a, apiResponse_b);
            (_a = document.getElementById("loading")) === null || _a === void 0 ? void 0 : _a.classList.add("hide");
            (_b = document.getElementById("results")) === null || _b === void 0 ? void 0 : _b.classList.add("show");
            const competitor_a = document.getElementById("competitor_a");
            const competitor_b = document.getElementById("competitor_b");
            const column_a = document.getElementById("column_a");
            const column_b = document.getElementById("column_b");
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
    });
}
function showStats(articles, topic_key) {
    const tot_mentions_p = document.querySelector("#tot_mentions ." + topic_key + " p");
    const avg_sentiment_p = document.querySelector("#avg_sentiment ." + topic_key + " p");
    const tot_positive_p = document.querySelector("#tot_positive ." + topic_key + " p");
    const tot_negative_p = document.querySelector("#tot_negative ." + topic_key + " p");
    tot_mentions_p.innerText = articles.length.toString();
    const averageSentiment = articles.reduce((acc, article) => acc + article.sentiment.score, 0);
    avg_sentiment_p.innerText = (averageSentiment / articles.length).toFixed(2);
    const positiveArticles = articles.filter((article) => article.sentiment.text === "positive");
    tot_positive_p.innerText =
        positiveArticles.length.toString();
    const negativeArticles = articles.filter((article) => article.sentiment.text === "negative");
    tot_negative_p.innerText =
        negativeArticles.length.toString();
}
function caclulateWinner() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    let score_a = 0;
    let score_b = 0;
    const tot_mentions_elem_a = document.querySelector("#tot_mentions .a p");
    const tot_mentions_elem_b = document.querySelector("#tot_mentions .b p");
    // Get the total number of mentions for both topics
    const tot_mentions_a = parseInt(tot_mentions_elem_a.innerText);
    const tot_mentions_b = parseInt(tot_mentions_elem_b.innerText);
    // Compare and select a winner
    if (tot_mentions_a > tot_mentions_b) {
        (_a = document.querySelector("#tot_mentions .a")) === null || _a === void 0 ? void 0 : _a.classList.add("winner");
        score_a += 5;
    }
    else if (tot_mentions_a < tot_mentions_b) {
        (_b = document.querySelector("#tot_mentions .b")) === null || _b === void 0 ? void 0 : _b.classList.add("winner");
        score_b += 5;
    }
    else {
        (_c = document.querySelector("#tot_mentions .a")) === null || _c === void 0 ? void 0 : _c.classList.add("tied");
        (_d = document.querySelector("#tot_mentions .b")) === null || _d === void 0 ? void 0 : _d.classList.add("tied");
        score_a += 2.5;
        score_b += 2.5;
    }
    // Get the average sentiment of both topics
    const avg_sentiment_a_p = document.querySelector("#avg_sentiment .a p");
    const avg_sentiment_b_p = document.querySelector("#avg_sentiment .b p");
    const avg_sentiment_a = parseFloat(avg_sentiment_a_p === null || avg_sentiment_a_p === void 0 ? void 0 : avg_sentiment_a_p.innerText);
    const avg_sentiment_b = parseFloat(avg_sentiment_b_p === null || avg_sentiment_b_p === void 0 ? void 0 : avg_sentiment_b_p.innerText);
    // Compare and select a winner
    if (avg_sentiment_a > avg_sentiment_b) {
        (_e = document.querySelector("#avg_sentiment .a")) === null || _e === void 0 ? void 0 : _e.classList.add("winner");
        score_a += 5;
    }
    else if (avg_sentiment_a < avg_sentiment_b) {
        (_f = document.querySelector("#avg_sentiment .b")) === null || _f === void 0 ? void 0 : _f.classList.add("winner");
        score_b += 5;
    }
    else {
        (_g = document.querySelector("#avg_sentiment .a")) === null || _g === void 0 ? void 0 : _g.classList.add("tied");
        (_h = document.querySelector("#avg_sentiment .b")) === null || _h === void 0 ? void 0 : _h.classList.add("tied");
        score_a += 2.5;
        score_b += 2.5;
    }
    // Get the total number of positive articles for both topics
    const tot_positive_a_p = document.querySelector("#tot_positive .a p");
    const tot_positive_b_p = document.querySelector("#tot_positive .b p");
    const tot_positive_a = parseInt(tot_positive_a_p === null || tot_positive_a_p === void 0 ? void 0 : tot_positive_a_p.innerText);
    const tot_positive_b = parseInt(tot_positive_b_p === null || tot_positive_b_p === void 0 ? void 0 : tot_positive_b_p.innerText);
    // Compare and select a winner
    if (tot_positive_a > tot_positive_b) {
        (_j = document.querySelector("#tot_positive .a")) === null || _j === void 0 ? void 0 : _j.classList.add("winner");
        score_a += 5;
    }
    else if (tot_positive_a < tot_positive_b) {
        (_k = document.querySelector("#tot_positive .b")) === null || _k === void 0 ? void 0 : _k.classList.add("winner");
        score_b += 5;
    }
    else {
        (_l = document.querySelector("#tot_positive .a")) === null || _l === void 0 ? void 0 : _l.classList.add("tied");
        (_m = document.querySelector("#tot_positive .b")) === null || _m === void 0 ? void 0 : _m.classList.add("tied");
        score_a += 2.5;
        score_b += 2.5;
    }
    // Get the total number of negative articles for both topics
    const tot_negative_a_p = document.querySelector("#tot_negative .a p");
    const tot_negative_b_p = document.querySelector("#tot_negative .b p");
    const tot_negative_a = parseInt(tot_negative_a_p === null || tot_negative_a_p === void 0 ? void 0 : tot_negative_a_p.innerText);
    const tot_negative_b = parseInt(tot_negative_b_p === null || tot_negative_b_p === void 0 ? void 0 : tot_negative_b_p.innerText);
    // Compare and select a winner
    if (tot_negative_a < tot_negative_b) {
        (_o = document.querySelector("#tot_negative .a")) === null || _o === void 0 ? void 0 : _o.classList.add("winner");
        score_a += 5;
    }
    else if (tot_negative_a > tot_negative_b) {
        (_p = document.querySelector("#tot_negative .b")) === null || _p === void 0 ? void 0 : _p.classList.add("winner");
        score_b += 5;
    }
    else {
        (_q = document.querySelector("#tot_negative .a")) === null || _q === void 0 ? void 0 : _q.classList.add("tied");
        (_r = document.querySelector("#tot_negative .b")) === null || _r === void 0 ? void 0 : _r.classList.add("tied");
        score_a += 2.5;
        score_b += 2.5;
    }
    // Calculate the winner
    const tot_score_elem_a = document.querySelector("#tot_score .a p");
    const tot_score_elem_b = document.querySelector("#tot_score .b p");
    tot_score_elem_a.innerText = score_a.toString();
    tot_score_elem_b.innerText = score_b.toString();
    const winner_name = document.getElementById("winner_name");
    const urlParams = new URLSearchParams(window.location.search);
    if (score_a > score_b) {
        (_s = document.querySelector("#tot_score .a")) === null || _s === void 0 ? void 0 : _s.classList.add("winner");
        winner_name.innerText = input_1.value;
    }
    else if (score_a < score_b) {
        (_t = document.querySelector("#tot_score .b")) === null || _t === void 0 ? void 0 : _t.classList.add("winner");
        winner_name.innerText = input_2.value;
    }
    else {
        (_u = document.querySelector("#tot_score .a")) === null || _u === void 0 ? void 0 : _u.classList.add("tied");
        (_v = document.querySelector("#tot_score .b")) === null || _v === void 0 ? void 0 : _v.classList.add("tied");
        winner_name.innerText = "TIED";
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
// if query params are set in the URL, convert them to input values
const urlParams = new URLSearchParams(window.location.search);
const topic_1 = urlParams.get("topic_a");
const topic_2 = urlParams.get("topic_b");
if (topic_1 && topic_2) {
    input_1.value = topic_1;
    input_2.value = topic_2;
    (_a = document.getElementById("part_1")) === null || _a === void 0 ? void 0 : _a.classList.add("remove");
    (_b = document.getElementById("part_2")) === null || _b === void 0 ? void 0 : _b.classList.add("show");
    fetchData(input_1.value, input_2.value);
}
