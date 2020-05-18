import { useState, useEffect } from "preact/hooks";

import foursquare from "../data/config";
import { icons } from "../data/icons";

import Header from "./Header";
import Nav from "./Nav";
import Card from "./Card";

import "../style/style.css";

const App = () => {
  const [state, setState] = useState({
    items: [],
    total: 0,
  });

  useEffect(() => {
    fetchVenues("");
  }, []);

  const fetchVenues = (query) => {
    const params = {
      near: "Kharkiv",
      indent: "browse",
      query,
    };

    foursquare.venues.recommendations(params).then((res) => {
      setState({
        ...state,
        items: res.response.group.results,
        total: res.response.group.totalResults,
      });
    });
  };

  const setQuery = (label) => fetchVenues(label);

  return (
    <div class="app">
      <Header total={state.total} />

      <nav class="flex space nav">
        {icons.map((i) => (
          <Nav key={i.id} src={i.src} label={i.label} setQuery={setQuery} />
        ))}
      </nav>

      <section class="flex wrap">
        {state.items.length > 0 ? (
          state.items.map((item) => {
            if (item.photo) {
              let photoUrl = item.photo.prefix + "350x350" + item.photo.suffix;
              let categoryIcon =
                item.venue.categories[0].icon.prefix +
                "100" +
                item.venue.categories[0].icon.suffix;
              let venueUrl = "https://foursquare.com/v/" + item.venue.id;

              return (
                <Card
                  key={item.venue.id}
                  item={item.venue}
                  venueUrl={venueUrl}
                  photoUrl={photoUrl}
                  categoryIcon={categoryIcon}
                />
              );
            }
          })
        ) : (
          <aside class="material">
            <div class="place-line">
              <div class="progress-bar first"></div>
              <div class="progress-bar second"></div>
            </div>
          </aside>
        )}
      </section>
    </div>
  );
};

export default App;
