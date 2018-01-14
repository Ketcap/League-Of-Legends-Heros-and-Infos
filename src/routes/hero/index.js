import { h, Component } from 'preact';

import { connect } from 'mobx-preact';

@connect(['store'])
export default class Hero extends Component {
	state = {
		hero: null
	};

	replaceTooltip(spell) {
		let tooltip = spell.tooltip;
		['(', ')', '}}', '_'].map(val => tooltip = tooltip.split(val).join(''));
		spell.effect.map((e, i) => {
			if (e !== null) tooltip = tooltip.replace(new RegExp(`{{ e${i}`), `<span class="uk-text-danger">${e.toString()}</span>`);
		});
		spell.effectBurn.map((e, i) => {
			if (e !== null) tooltip = tooltip.replace(new RegExp(`{{ f${i}`), `<span class="uk-text-primary">${e.toString()}</span>`);
		});
		spell.vars.map((e, i) => {
			const damageType = e.link.indexOf('attack') > -1 ? 'AD' : 'AP';
			if (e !== null) tooltip = tooltip.replace(new RegExp(`{{ ${e.key}`), `<span class="uk-text-success"> ${Math.floor(e.coeff * 10)}% ${damageType}`);
		});
		return tooltip;
	}

	componentDidMount() {
		const self = this;
		let Store = self.props.store.Store;

		const heroname = self.props.heroname;
		Store.findHero(heroname, (hero) => {
			this.setState({ hero });
			console.log(hero);
		});

	}

	render({ store }, { hero }) {
		const self = this;
		if (hero === null) {
			return (<div> Loading ...</div>);
		}
		const version = store.Store.version;
		return (
			<div>
				<div uk-grid>
					<div class="uk-width-1-1">
						<div>
							<div class="uk-background-cover uk-background-fixed uk-height-large uk-panel uk-flex uk-flex-center uk-flex-middle uk-light"
								style={`background-image: url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${hero.id}_0.jpg);`}>
								<p class="uk-h4">
									{hero.name}
									<br />
									<span class="uk-text-meta">{hero.title}</span>
									<br />
									{hero.tags.map(tag => (<span class="uk-label uk-margin-right">{tag}</span>))}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="uk-padding-large uk-padding-remove-top uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-1-2@l uk-grid-match " uk-grid>
					{/* Champ Stats */}
					<div>
						<div class="uk-card uk-card-default uk-card-body">
							<blockquote cite="#">
								<p class="uk-margin-small-bottom">{hero.blurb}</p>
							</blockquote>
							<hr class="uk-divider-icon" />
							<table class="uk-table">
								<caption>Stats</caption>
								<thead>
									<tr>
										<th>Stat Type</th>
										<th>Base Stat</th>
										<th>Per Level</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Health</td>
										<td>{hero.stats.hp}</td>
										<td>{hero.stats.hpperlevel}</td>
									</tr>
									{hero.partype !== 'None' ?
										<tr>
											<td>{hero.partype}</td>
											<td>{hero.stats.mp}</td>
											<td>{hero.stats.mpperlevel}</td>
										</tr> : null}
									<tr>
										<td>Armor</td>
										<td>{hero.stats.armor}</td>
										<td>{hero.stats.armorperlevel}</td>
									</tr>
									<tr>
										<td>Magic Resist</td>
										<td>{hero.stats.spellblock}</td>
										<td>{hero.stats.spellblockperlevel}</td>
									</tr>
									<tr>
										<td>Attack Damage</td>
										<td>{hero.stats.attackdamage}</td>
										<td>{hero.stats.attackdamageperlevel}</td>
									</tr>
									<tr>
										<td>Attack Range</td>
										<td>{hero.stats.attackrange}</td>
										<td>0</td>
									</tr>
									<tr>
										<td>Movement Speed</td>
										<td>{hero.stats.movespeed}</td>
										<td>0</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					{/* Lore */}
					<div>
						<div class="uk-card uk-card-default uk-card-body">
							<h3 class="uk-card-title">Lore</h3>
							<p>{hero.lore}</p>
							<div>
								Attack
								<progress id="js-progressbar" class="uk-progress" value={hero.info.attack * 10} max="100" />
							</div>
							<div>
								Defense
								<progress id="js-progressbar" class="uk-progress" value={hero.info.defense * 10} max="100" />
							</div>
							<div>
								Difficulty
								<progress id="js-progressbar" class="uk-progress" value={hero.info.difficulty * 10} max="100" />
							</div>
							<div>
								Magic
								<progress id="js-progressbar" class="uk-progress" value={hero.info.magic * 10} max="100" />
							</div>
						</div>

					</div>
					{/* Skills */}
					<div class="uk-width-1-1@s">
						<div class="uk-card uk-card-default uk-card-body">
							<h3 class="uk-card-title">Skills</h3>
							<ul class="uk-tab"  uk-switcher="animation: uk-animation-slide-left-medium, uk-animation-slide-right-medium">
								<li><a href="#"><img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${hero.passive.image.full}`} /></a></li>
								{hero.spells.map(spell =>
									<li><a href="#"><img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`} /></a></li>
								)}
							</ul>
							<ul class="uk-switcher uk-margin">
								<li>
									<div class="uk-padding">
										<p class="uk-text-bold">{hero.passive.name}</p>
										<p class="uk-text-meta" dangerouslySetInnerHTML={{ __html: hero.passive.description }} />
									</div>
								</li>
								{hero.spells.map(spell =>
									(
										<div class="uk-padding">
											<li>
												<p class="uk-text-bold">{spell.name}</p>
												<p class="uk-text-meta">{spell.description}</p>
												<p dangerouslySetInnerHTML={{ __html: self.replaceTooltip(spell) }} />
											</li>
										</div>

									)
								)}
							</ul>
						</div>
					</div>
					<div class="uk-width-1-1@s">
						<div class="uk-card uk-card-default uk-card-body">
							<div class="uk-child-width-1-3@m" uk-grid uk-lightbox="animation: fade">
								{hero.skins.map(skin => (
									<div>
										<a class="uk-inline" href={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${hero.id}_${skin.num}.jpg`}
											caption={skin.name === 'default' ? 'Classic' : skin.name}
										>
											<img src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${hero.id}_${skin.num}.jpg`} alt="" />
										</a>
									</div>
								))}
							</div>
						</div>
					</div>

				</div>
			</div>

		);
	}
}
