import { fetchData } from "./battle.js";

// When a li is clicked, it's text content is input into the input field
const tags = document.querySelectorAll(".scroller li");
export const input_1 = document.querySelector("#search-topic-a") as HTMLInputElement;
export const input_2 = document.querySelector("#search-topic-b") as HTMLInputElement;

tags.forEach((tag) => {
    tag.addEventListener("click", () => {
        // split tag value 'A vs B' into two separate values 'A' and 'B'
        const tagValue = tag.textContent?.split(" vs ") || [];
        input_1.value = tagValue[0];
        input_2.value = tagValue[1];
    });
});

// FORM HANDLING
const form = document.querySelector("form") as HTMLFormElement;
form.addEventListener("submit", (e) => {
    // prevent submit of empty input field
    e.preventDefault();
    if (input_1.value === "" || input_2.value === "") {
        const tooltip = document.createElement("div");
        tooltip.textContent = "Enter 2 topics";
        tooltip.classList.add("tooltip");
        form.appendChild(tooltip);
    } else {
        document.getElementById("part_1")?.classList.add("remove");
        document.getElementById("part_2")?.classList.add("show");
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
