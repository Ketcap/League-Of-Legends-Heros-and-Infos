import { h, Component } from 'preact';
import withContext from '../../store/withContext';
import { Dragon } from '../../store';

class Hero extends Component {
	componentDidMount() {
		const { setHero } = this.props.context;
		const { heroname } = this.props.matches;
		setHero(heroname);
	}
	render() {
		const { hero, DataDragon } = this.props.context;
		if (!hero) {
			return (
				<div>Loading....</div>
			);
		}
		return (
			<div uk-grid>
				<div class="uk-width-1-1">
					<div>
						<div class="uk-background-cover uk-background-fixed uk-height-large uk-panel uk-flex uk-flex-center uk-flex-middle uk-light"
							style={`background-image: url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${hero.id}_0.jpg)`}
						>
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
							<ul class="uk-tab" uk-switcher="animation: uk-animation-slide-left-medium, uk-animation-slide-right-medium">
								<li><a href="#"><img src={`https://ddragon.leagueoflegends.com/cdn/${DataDragon.versions[0]}/img/passive/${hero.passive.image.full}`} /></a></li>
								{hero.get_spells().map(spell =>
									<li><a href="#"><img src={spell.image} /></a></li>
								)}
							</ul>
							<ul class="uk-switcher uk-margin">
								<li>
									<div class="uk-padding">
										<p class="uk-text-bold">{hero.passive.name}</p>
										<p class="uk-text-meta" dangerouslySetInnerHTML={{ __html: hero.passive.description }} />
									</div>
								</li>
								{hero.get_spells().map(spell =>
									(
										<div class="uk-padding">
											<li>
												<p class="uk-text-bold">{spell.name}</p>
												<p class="uk-text-meta" dangerouslySetInnerHTML={{ __html: spell.description }} />
												<p>{spell.tooltip}</p>
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
										<a class="uk-inline" href={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${hero.id}_${skin.num}.jpg`}
											caption={skin.name === 'default' ? 'Classic' : skin.name}
										>
											<img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${hero.id}_${skin.num}.jpg`} alt="" />
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
export default withContext(Hero);