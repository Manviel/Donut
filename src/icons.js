const icons = [
  {
    id: "01",
    src: "rice.svg",
    label: "Breakfast",
  },
  {
    id: "02",
    src: "croissant.svg",
    label: "Cake",
  },
  {
    id: "03",
    src: "pie.svg",
    label: "Pizza",
  },
  {
    id: "04",
    src: "doughnut.svg",
    label: "Donuts",
  },
  {
    id: "05",
    src: "setting.svg",
    label: "Add",
  },
];

const nav = document.querySelector("nav");

const render = () => {
  icons.map((i) => {
    const item = document.createElement("div");

    item.className = "flex col align text";

    item.innerHTML = `
      <figure class="flex circle icon align center">
        <img src="../icons/${i.src}" class="picture" alt="${i.id}" />
      </figure>
      <span class="active sub">${i.label}</span>
    `;

    nav.appendChild(item);

    item.addEventListener("click", setQuery);
  });
};

function setQuery() {
  showSpinner();

  chrome.runtime.sendMessage({ query: this.innerText });
}

render();
