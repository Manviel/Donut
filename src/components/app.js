import { Component } from 'preact';

import foursquare from '../config';

import Header from './Header';
import Nav from './Nav';
import Card from './Card';

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

	setQuery = e => {
		this.setState({ query: e.target.value });
	}

	setLocation = e => {
		this.setState({ near: e.target.value });
	}

	render() {
		return (
			<div id="app">
				<Header />
				<Nav />
				<section class="flex col align">
					{this.state.items.map(item => {
						if (item.photo) {
							let photoUrl = item.photo.prefix + '350x350' + item.photo.suffix;
							let categoryIcon = item.venue.categories[0].icon.prefix + '100' + item.venue.categories[0].icon.suffix;
							let venueUrl = "https://foursquare.com/v/" + item.venue.id;

							return (
								<Card key={item.venue.id}
									item={item.venue}
									venueUrl={venueUrl}
									photoUrl={photoUrl}
									categoryIcon={categoryIcon}
								/>
							);
						}
					})}
				</section>
			</div>
		);
	}
}

export default App;