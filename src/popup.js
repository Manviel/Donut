const foursquare = {
  client_id: "HPBPKSWKU1A1PFOT3OJXWHUYRQGAC0P1VFMW44DFXVO532T1",
  client_secret: "ZFUREBXR2PHQHAGKH045CXMXMBVVVZRKIZDP2UBTAHVPOEGF",
  date: 20180323,
  query: "",
  coords: [40.72, -74.01],
};

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

const fetchVenues = async () => {
  const request = await fetch(
    `https://api.foursquare.com/v2/venues/explore?client_id=${foursquare.client_id}&client_secret=${foursquare.client_secret}&v=${foursquare.date}&ll=${foursquare.coords[0]},${foursquare.coords[1]}&query=${foursquare.query}`
  );

  const result = await request.json();

  if (request.ok) {
    hideSpinner();

    getResponse(result.response.groups[0].items);
    totalEntries(result.response.totalResults);
  } else {
    hideSpinner();
  }
};

const getResponse = (data) => {
  console.log(data);

  data.map((place) => {
    const i = place.venue;

    const categoryIcon =
      i.categories[0].icon.prefix + "100" + i.categories[0].icon.suffix;

    const venueUrl = "https://foursquare.com/v/" + i.id;

    const label = i.categories[0].shortName;

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
        <p class="px-15">${i.location.address}</p>
        <div class="sub">
          <a href="${venueUrl}" target="_blank" class="reference rad">${i.hereNow.summary}</a>
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
  fetchVenues();
};

initialLoading();
