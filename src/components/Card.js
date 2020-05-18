const Card = ({ item, venueUrl, photoUrl, categoryIcon }) => (
  <article class="card rad flex col space">
    <section class="flex align info">
      <img src={categoryIcon} class="category" />

      <div class="flex col name">
        <h4 class="bottom">{item.name}</h4>
        <p class="address">{item.location.address || item.location.cc}</p>
      </div>
    </section>

    <div style={{ backgroundImage: `url(${photoUrl})` }} class="preview">
      <a href={venueUrl} class="rel"></a>
    </div>
  </article>
);

export default Card;
