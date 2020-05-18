const Nav = ({ key, src, label, setQuery }) => (
  <div class="flex col text" onClick={() => setQuery(label)}>
    <figure class="flex circle align center">
      <img src={require(`../assets/img/${src}`)} class="picture" alt={key} />
    </figure>

    <span class="active sub">{label}</span>
  </div>
);

export default Nav;
