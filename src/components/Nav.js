const Nav = () => (
  <nav class="flex space nav">
    <div class="flex col text">
      <figure class="flex circle align center">
        <img src={require("../assets/img/rice.svg")} class="picture" alt="break" />
      </figure>
      <span class="active sub">Breakfast</span>
    </div>
    <div class="flex col text">
      <figure class="flex circle align center">
        <img src={require("../assets/img/croissant.svg")} class="picture" alt="cake" />
      </figure>
      <span class="grey sub">Cake</span>
    </div>
    <div class="flex col text">
      <figure class="flex circle align center">
        <img src={require("../assets/img/pie.svg")} class="picture" alt="pizza" />
      </figure>
      <span class="grey sub">Pizza</span>
    </div>
    <div class="flex col text">
      <figure class="flex circle align center">
        <img src={require("../assets/img/doughnut.svg")} class="picture" alt="donut" />
      </figure>
      <span class="grey sub">Donuts</span>
    </div>
  </nav>
);

export default Nav;