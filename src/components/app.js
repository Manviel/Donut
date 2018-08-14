import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Venues from '../routes/venues';

export default class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Router onChange={this.handleRoute}>
					<Venues path="/" />
				</Router>
			</div>
		);
	}
}
