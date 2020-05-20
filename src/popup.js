const root = document.querySelector("#root");
const loader = document.createElement("aside");

const showSpinner = () => {
  loader.className = "material";

  loader.innerHTML = `
    <div class="place-line">
      <div class="progress-bar first"></div>
      <div class="progress-bar second"></div>
    </div>
  `;

  document.body.appendChild(loader);
};

hideSpinner = () => {
  document.body.removeChild(loader);
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.json) {
    const result = request.json;

    getResponse(result.groups[0].items);
    totalEntries(result.totalResults);
    hideSpinner();
  }

  sendResponse();
});

const getResponse = (data) => {
  root.innerHTML = "";

  data.map((place) => {
    const i = place.venue;

    const categoryIcon =
      i.categories[0].icon.prefix + "100" + i.categories[0].icon.suffix;

    const venueUrl = "https://foursquare.com/v/" + i.id;

    const label = i.categories[0].shortName;

    const summary = place.reasons.items[0].summary;

    const card = document.createElement("article");

    card.className = "card rad flex col space";

    card.innerHTML = `
      <section class="flex space">
        <div>
          <span class="info">${label}</span>
          <h4 class="px-24">${i.name} &bull; ${i.location.distance}m</h4>
        </div>
        <img src=${categoryIcon} class="category icon" />
      </section>
      <div class="flex col">
        <p class="px-15">${i.location.address || i.location.country}</p>
        <div class="sub">
          <a href="${venueUrl}" target="_blank" class="reference rad">${summary}</a>
        </div>
      </div>
    `;

    root.appendChild(card);
  });
};

const totalEntries = (total) => {
  const header = document.querySelector("#total");

  header.innerHTML = ` Total: ${total} results`;
};

const initialLoading = () => {
  showSpinner();

  chrome.runtime.sendMessage({ query: "" });
};

initialLoading();
