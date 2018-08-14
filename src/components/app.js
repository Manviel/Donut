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
			<div id="app">
				<Header />
				<Nav />
				<Card />
			</div>
		);
	}
}

export default App;