import { fetchData } from "./battle.js";
// When a li is clicked, it's text content is input into the input field
const tags = document.querySelectorAll(".scroller li");
export const input_1 = document.querySelector("#search-topic-a");
export const input_2 = document.querySelector("#search-topic-b");
tags.forEach((tag) => {
    tag.addEventListener("click", () => {
        var _a;
        // split tag value 'A vs B' into two separate values 'A' and 'B'
        const tagValue = ((_a = tag.textContent) === null || _a === void 0 ? void 0 : _a.split(" vs ")) || [];
        input_1.value = tagValue[0];
        input_2.value = tagValue[1];
    });
});
// FORM HANDLING
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    var _a, _b;
    // prevent submit of empty input field
    e.preventDefault();
    if (input_1.value === "" || input_2.value === "") {
        const tooltip = document.createElement("div");
        tooltip.textContent = "Enter 2 topics";
        tooltip.classList.add("tooltip");
        form.appendChild(tooltip);
    }
    else {
        (_a = document.getElementById("part_1")) === null || _a === void 0 ? void 0 : _a.classList.add("remove");
        (_b = document.getElementById("part_2")) === null || _b === void 0 ? void 0 : _b.classList.add("show");
        fetchData(input_1.value, input_2.value);
    }
});
// remove the tooltip when the input field is clicked
input_1.addEventListener("click", () => {
    const tooltip = document.querySelector(".tooltip");
    if (tooltip) {
        tooltip.remove();
    }
});
