import { h, Component } from 'preact';
import style from './style';

const foursquare = require('react-foursquare')({
  clientID: 'HPBPKSWKU1A1PFOT3OJXWHUYRQGAC0P1VFMW44DFXVO532T1',
  clientSecret: 'ZFUREBXR2PHQHAGKH045CXMXMBVVVZRKIZDP2UBTAHVPOEGF'
});

export default class Venues extends Component {
  state = {
    items: [],
    query: '',
    near: 'San Francisco, CA'
  };

  componentDidMount() {
    this.fetchVenues();
  }

  fetchVenues = () => {
    const params = {
      "near": this.state.near,
      "indent": 'browse',
      "query": this.state.query
    };

    foursquare.venues.recommendations(params)
      .then(res => {
        this.setState({
          items: res.response.group.results
        });
      });
  }

  setQuery = e => {
    this.setState({ query: e.target.value });
  }

  setLocation = e => {
    this.setState({ near: e.target.value });
  }

  render() {
    return (
      <div class={style.container}>
        <header class={style.header}>
          <section class={style.search}>
            <div class={style.padding}>
              <label>Find</label>
              <input class={style.field} type="text"
                onChange={this.setQuery}
                placeholder="coffee, shop"
              />
            </div>
            <div class={style.padding}>
              <label>Near</label>
              <input class={style.field} type="text"
                onChange={this.setLocation}
                placeholder="San Francisco"
              />
            </div>
            <button class={style.find} onClick={this.fetchVenues}>Search</button>
          </section>
        </header>
        {this.state.items.map(item => {
          if (item.photo) {
            let photoUrl = item.photo.prefix + '350x350' + item.photo.suffix;
            let ratingColor = 'background-color: #' + item.venue.ratingColor;
            let categoryIcon = item.venue.categories[0].icon.prefix + '100' + item.venue.categories[0].icon.suffix;
            let venueUrl = "https://foursquare.com/v/" + item.venue.id;

            return (
              <div key={item.venue.id}>
                <a href={venueUrl}>
                  <article class={style.box}>
                    <img src={photoUrl} />
                    <section class={style.wrap}>
                      <p class={style.name}>
                        {item.venue.name}
                      </p>
                      <p class={style.address}>
                        {item.venue.location.address}
                      </p>
                      <span class={style.rating} style={ratingColor}>
                        {item.venue.rating}
                      </span>
                      <span class={style.category}>
                        <img class={style.icon} src={categoryIcon} />
                      </span>
                    </section>
                  </article>
                </a>
              </div>
            )
          }
        })}
      </div>
    );
  }
}