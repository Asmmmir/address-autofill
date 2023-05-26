const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
var url =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
const API_KEY = "da4b84b4d206862d7a25e8f22004e669db780981";
const SECRET_KEY = "44f4e07489d9ffd7664acff40a46e0249d1b08e5";
const suggestItem = document.getElementsByClassName("suggest");

btn.addEventListener("click", () => {
  search.classList.toggle("active");
  input.focus();
});

function pickSuggest(e) {
  input.value = e.target.innerText;
}

function blurSuggest(e) {
  if (!search.contains(e.target)) {
    const suggestions = document.querySelector(".suggestions");
    suggestions.innerHTML = "";
  }
}

const getAdress = async (e) => {
  const query = document.querySelector(".input").value;
  const suggestions = document.querySelector(".suggestions");
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + API_KEY,
    },

    body: JSON.stringify({ query }),
  })
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  suggestions.innerHTML = "";

  response.suggestions.map((address) => {
    if (address.value) {
      const suggestElement = document.createElement("p");
      suggestElement.classList.add("suggest");
      suggestElement.innerText = `${address.data.country}, ${address.value}`;
      suggestElement.addEventListener("click", pickSuggest);
      suggestions.appendChild(suggestElement);
    }
  });
};

input.addEventListener("input", getAdress);
document.body.addEventListener("click", blurSuggest);
