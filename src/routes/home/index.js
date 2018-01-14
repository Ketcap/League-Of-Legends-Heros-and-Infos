import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import { connect } from 'mobx-preact';

@connect(['store'])
export default class Home extends Component {
	state = {
		heros: null,
		heroNum: 8
	};

	heroImage(heroName) {
		return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${heroName}_0.jpg`;
	}
	loadMore(event) {
		event.preventDefault();
		this.setState({ heroNum: this.state.heroNum + 8 });
		
	}
	componentDidMount() {
		const self = this;
		let Store = self.props.store.Store;
		let heros = Store.randomHeros();
		setTimeout(() => {
			let arrayOfObject = [];
			for (let key in heros) {
				if (heros[key]) {
					arrayOfObject.push(heros[key]);
				}
			}
			self.setState({ heros: arrayOfObject });
		}, 0);
	}
	render({ store }, { heros, heroNum }) {
		const self = this;
		return (
			<div>
				<div class="uk-child-width-1-2@m uk-child-width-1-4@l uk-padding-large" uk-grid>
					{heros !== null ? heros.slice(0, heroNum).map(hero => (
						<div>
							<Link href={`/hero/${hero.name}`} style={{ textDecoration: 'none' }}>
								<div class="uk-card uk-card-default uk-card-hover">
									<div class="uk-card-media-top uk-inline-clip uk-transition-toggle" tabindex="0">
										<img class="uk-transition-scale-up uk-transition-opaque" src={self.heroImage(hero.key)} alt="" />
									</div>
									<div class="uk-card-body">
										{hero.name}
										<p class="uk-text-meta uk-margin-remove-top">{hero.title}</p>
									</div>
								</div>
							</Link>
						</div>
					)
					) : null
					}
				</div>
				<div class="uk-width-1-1@s uk-flex">
					<button class="uk-button uk-button-default uk-margin-auto" 
						//eslint-disable-next-line
						onClick={(e)=>self.loadMore(e)}>Load More</button>
				</div>
			</div>
		);
	}
}
