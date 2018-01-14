import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		return (
			<header class={style.header}>
				<nav class="uk-navbar-container" uk-navbar>
					<div class="uk-navbar-center">

						<div class="uk-navbar-center-left"><div>
							<ul class="uk-navbar-nav">
								<li><Link activeClassName="active" href="/">Champions</Link></li>
							</ul>
						</div></div>
						<a class="uk-navbar-item uk-logo" href="#"><img src="/assets/logo.png" width="100" /></a>
						<div class="uk-navbar-center-right"><div>
							<ul class="uk-navbar-nav">
								<li><Link activeClassName="active">Summoners</Link></li>
							</ul>
						</div></div>

					</div>
				</nav>
			</header>
		);
	}
}
