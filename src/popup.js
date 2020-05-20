const root = document.getElementById("root");
const loader = document.createElement("aside");
const modal = document.createElement("aside");

const FPS = 16;
const MAX_SIZE = 600;
const MIN_SIZE = 380;
const STEP = 11;

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
        <div class="flex align space">
          <button class="btn rad">
            <a href="${venueUrl}" target="_blank" class="reference sub">${summary}</a>
          </button>
          <button class="btn rad">Order</button>
        </div>
      </div>
    `;

    root.appendChild(card);

    card.children[1].children[1].children[1].addEventListener(
      "click",
      createModal
    );
  });
};

const totalEntries = (total) => {
  const header = document.getElementById("total");

  header.innerHTML = ` Total: ${total} results`;
};

const createModal = () => {
  modal.className = "overlay";

  modal.innerHTML = `
    <article class="content modal text">
      <header class="flex space align group">
        <h3 class="payment">
          <svg
            width="15"
            height="17"
            viewBox="0 0 15 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.1261 2.76635C10.7498 2.03386 11.1697 1.01446 11.0551 0C10.1561 0.034966 9.06868 0.580974 8.42354 1.31302C7.84557 1.96124 7.33922 2.99901 7.47577 3.9933C8.47816 4.06861 9.50205 3.49929 10.1261 2.76635ZM15 12.4372C14.9792 12.4979 14.6131 13.6665 13.7249 14.8731C12.9572 15.9167 12.1604 16.9563 10.9052 16.9776C9.67162 16.9989 9.27506 16.2974 7.86472 16.2974C6.45483 16.2974 6.01442 16.9563 4.84644 16.9989C3.63507 17.0414 2.71223 15.8706 1.93804 14.831C0.35596 12.7044 -0.853105 8.82206 0.770523 6.20133C1.57703 4.89983 3.01784 4.07559 4.58238 4.05432C5.77205 4.03349 6.89525 4.79879 7.62235 4.79879C8.34945 4.79879 9.71409 3.87839 11.1489 4.01355C11.7495 4.03659 13.4355 4.23911 14.5185 5.71255C14.4312 5.76262 12.5066 6.80445 12.5274 8.9714C12.5532 11.5638 14.9732 12.4261 15 12.4372Z"
              fill="#0B0B09"
            />
          </svg>
          <span class="small">Pay</span>
        </h3>
        <button class="cancel" id="cancel">Cancel</button>
      </header>

      <section class="flex space align group">
        <figure class="bill"></figure>
        <figcaption class="caption px-14">Capital one bank</figcaption>
      </section>

      <section class="sub">
        <p class="flex group space px-14">
          <small>SALES TAX</small> 10.00
        </p>
        <p class="flex group space px-14">
          <small>SHIPPING</small> 17.00
        </p>
        <p class="flex space px-24">
          TOTAL <b>27.00</b>
        </p>
      </section>

      <button class="btn rad" id="pay">Pay with Touch ID</button>
    </article>
  `;

  document.body.appendChild(modal);

  const content = modal.children[0];

  let pos = MAX_SIZE;

  const frame = () => {
    if (pos === MIN_SIZE) {
      clearInterval(timer);
    } else {
      pos -= STEP;
      content.style.top = pos + "px";
    }
  };

  const timer = setInterval(frame, FPS);

  document.getElementById("cancel").addEventListener("click", closeModal);
  document.getElementById("pay").addEventListener("click", checkAnimation);
};

const closeModal = () => {
  const content = modal.children[0];

  let pos = MIN_SIZE;

  const frame = () => {
    if (pos === MAX_SIZE) {
      clearInterval(timer);

      document.body.removeChild(modal);
    } else {
      pos += STEP;
      content.style.top = pos + "px";
    }
  };

  const timer = setInterval(frame, FPS);
};

const checkAnimation = () => {
  const content = modal.children[0];

  content.innerHTML = `
    <article class="flex center align wrapper">
      <div class="circle-blue">
        <div class="circle-white"></div>
      </div>
      <svg class="check-svg" width="70" height="70" viewBox="0 0 70 70">
        <polyline class="check-poly" points="23 34 34 43 47 27" stroke-linecap="round" />
      </svg>
    </article>
  `;

  setTimeout(() => {
    closeModal();
  }, 2000);
};

const initialLoading = () => {
  showSpinner();

  chrome.runtime.sendMessage({ query: "" });
};

initialLoading();
