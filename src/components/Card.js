const Card = ({ item, venueUrl, photoUrl, categoryIcon }) => (
  <article class="card rad">
    <section class="flex space align">
      <img src={categoryIcon} class="category" />
      <p class="name text">{item.name}</p>
      <figure class="icon love">
        <img src={require("../assets/img/heart.svg")} class="auto" alt="love" />
      </figure>
    </section>
    <address class="address text">{item.location.address || item.location.cc}</address>
    <div class="rel">
      <img src={photoUrl} class="rad shade" />
      <button class="btn abs more">Learn more</button>
      <a href={venueUrl} class="icon abs go flex align center">
        <img src={require("../assets/img/pointer.svg")} class="pointer" alt="go" />
      </a>
    </div>
    <span>Love</span>
  </article>
);

export default Card;