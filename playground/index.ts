import Fuzy, { Result } from "../src/index";
import { countries } from "./countries";

function performSearch() {
  const query = document
    .getElementById("searchInput")!
    //@ts-ignore
    .value!.toLowerCase();
  const fuzy = new Fuzy(countries);
  const results = fuzy.search(query);
  console.log("RESULTS", results);
  displayResults(results);
}

function displayResults(results: Result) {
  const resultsList = document.getElementById("resultsList")!;
  resultsList.innerHTML = "";

  results.forEach((result) => {
    const item = document.createElement("li");
    const text = result.text;

    let highlightedTitle = "";
    const matchIndexes = result.matches?.map((match) => match[1]);
    for (let i = 0; i < text.length; i++) {
      const ch = text.charAt(i);
      // check if this index matches except for space
      if (matchIndexes?.includes(i) && ch !== " ") {
        highlightedTitle += `<span class="highlight">${ch}</span>`;
      } else {
        highlightedTitle += ch;
      }
    }
    item.innerHTML = highlightedTitle;
    resultsList.appendChild(item);
  });
}

const input = document.getElementById("searchInput");

input?.addEventListener("input", performSearch);