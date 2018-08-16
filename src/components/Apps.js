import { Component } from 'preact';
import LazyLoad from 'react-lazy-load';

import foursquare from '../data/config';
import icons from '../data/icons.json';

import Header from 'async!./Header';
import Nav from 'async!./Nav';
import Card from 'async!./Card';

import '../style/style.css';

class App extends Component {
	state = {
		items: [],
		query: '',
		near: 'San Francisco'
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

	render() {
		return (
			<div id="app">
				<Header />
				<nav class="flex space nav">
					{icons.map(i => <Nav key={i.id} src={i.src} label={i.label} />)}
				</nav>
				<section class="flex col align">
					{this.state.items.map(item => {
						if (item.photo) {
							let photoUrl = item.photo.prefix + '350x350' + item.photo.suffix;
							let categoryIcon = item.venue.categories[0].icon.prefix + '100' + item.venue.categories[0].icon.suffix;
							let venueUrl = "https://foursquare.com/v/" + item.venue.id;

							return (
								<LazyLoad height={515} offsetVertical={-100}>
									<Card key={item.venue.id}
										item={item.venue}
										venueUrl={venueUrl}
										photoUrl={photoUrl}
										categoryIcon={categoryIcon}
									/>
								</LazyLoad>
							);
						}
					})}
				</section>
			</div>
		);
	}
}

export default App;