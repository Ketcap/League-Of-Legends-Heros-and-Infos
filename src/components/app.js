import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Helmet from 'preact-helmet';
import { Context } from '../store/index';

import Header from './header';
import Home from '../routes/home';
import Hero from '../routes/hero';

export default class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
	};
	render() {
		return (
			<div id="app">
				<Helmet
					link={[
						{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.36/css/uikit.min.css' }
					]}
					script={[
						{ src: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.36/js/uikit.min.js', type: 'text/javascript' },
						{ src: 'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.36/js/uikit-icons.min.js', type: 'text/javascript' }
					]}
				/>
				<Context>
					<Header />
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Hero path="/hero/:heroname" />
					</Router>
				</Context>
			</div>
		);
	}
}
