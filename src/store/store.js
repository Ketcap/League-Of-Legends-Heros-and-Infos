import { action, observable } from 'mobx';
import Champions from './collections/champions.json';
import fetch from 'unfetch';

class Store {
	apiKey = 'RGAPI-54b37d8d-0619-415e-9687-0472f74601ee';
	// version = '8.1.1';
	version = '7.24.2'
	@observable championList = {};

	constructor() {
		for (let champion in Champions) {
			if (Champions[champion]) {
				let hero = Champions[champion];
				this.championList[hero.id] = hero;
			}
		}
	}
	@action.bound
	randomHeros(count) {
		let arrayOfObject = [];
		for (let key in this.championList) {
			if (this.championList[key]) {
				arrayOfObject.push(this.championList[key]);
			}
		}
		let shuffled = this.shuffleArray(arrayOfObject);
		count ? count : count = shuffled.length;
		let objectOfArray = {};
		for (let i = 0; i < count; i++) {
			objectOfArray[i] = shuffled[i];
		}
		return objectOfArray;
	}

	@action.bound
	findHero(heroName, callback) {
		let self = this;
		let hero = null;
		for (let champion in self.championList) {
			if (self.championList[champion]) {
				self.championList[champion].name === heroName ? hero = self.championList[champion] : null;
			}
		}
		fetch(`http://ddragon.leagueoflegends.com/cdn/${self.version}/data/en_US/champion/${hero.key}.json`, {
			'Content-Type': 'application/json'
		})
			.then(r => r.json())
			.then(data => {
				callback(data.data[hero.key]);
			});

	}

	shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

}

export default new Store();