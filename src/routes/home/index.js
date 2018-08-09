import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { Dragon } from '../../store/';

export default class Home extends Component {
	state = {
		heros: 8
	};

	loadMore = (event) => {
		event.preventDefault();
		this.setState({ heros: this.state.heros + 8 });
	}

	render({ }, { heros }) {
		return (
			<Dragon.Consumer>
				{({ champs }) => (
					<div>
						<div class="uk-child-width-1-2@m uk-child-width-1-4@l uk-padding-large" uk-grid>
							{champs.slice(0, heros).map(hero => (
								<div>
									<Link href={`/hero/${hero.name}`} style={{ textDecoration: 'none' }}>
										<div class="uk-card uk-card-default uk-card-hover">
											<div class="uk-card-media-top uk-inline-clip uk-transition-toggle" tabindex="0">
												<img class="uk-transition-scale-up uk-transition-opaque" src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${hero.id}_0.jpg`} alt="" />
											</div>
											<div class="uk-card-body">
												{hero.name}
												<p class="uk-text-meta uk-margin-remove-top">{hero.title}</p>
											</div>
										</div>
									</Link>
								</div>
							))}
						</div>
						<div class="uk-width-1-1@s uk-flex">
							<button class="uk-button uk-button-default uk-margin-auto"
								//eslint-disable-next-line
								onClick={this.loadMore}>Load More</button>
						</div>
					</div>
				)}
			</Dragon.Consumer>
		);
	}
}
