// When a li is clicked, it's text content is input into the input field

const tags = document.querySelectorAll(".scroller li");
const input_1 = document.querySelector("#search-topic-a");
const input_2 = document.querySelector("#search-topic-b");

tags.forEach((tag) => {
  tag.addEventListener("click", () => {
    // split tag value 'A vs B' into two separate values 'A' and 'B'
    const tagValue = tag.textContent.split(" vs ");
    input_1.value = tagValue[0];
    input_2.value = tagValue[1];
  });
});

// prevent submit of empty input field
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  if (input_1.value === "" || input_2.value === "") {
    e.preventDefault();
    const tooltip = document.createElement("div");
    tooltip.textContent = "Enter 2 topics";
    tooltip.classList.add("tooltip");
    form.appendChild(tooltip);
  }
});

// remove the tooltip when the input field is clicked
input.addEventListener("click", () => {
  const tooltip = document.querySelector(".tooltip");
  if (tooltip) {
    tooltip.remove();
  }
});
