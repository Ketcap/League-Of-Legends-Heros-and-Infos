import { h, Component } from 'preact';
import { createContext } from 'preact-context';
import DataDragon from 'datadragonapi';

const Dragon = createContext();

class Context extends Component {
	state = {
		champs: [],
		hero: null
	};
	shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
	setHero = async (name) => {
		this.setState({ hero: null });
		const hero = await DataDragon.getChampions({ version: '8.15.1', champion: name });
		this.setState({ hero });
	}
	getChamps = async (version = '8.15.1', champion) => (
		await DataDragon.getChampions({ version, champion })
	)
	constructor(props) {
		super(props);
		this.setHero = this.setHero.bind(this);
	}
	async componentDidMount() {
		const champs = await this.getChamps();
		const shuffled = this.shuffle(champs);
		setTimeout(() => {
			this.setState({ champs: shuffled });
		}, 0);
	}
	render() {
		return (
			<Dragon.Provider
				value={{
					...this.state,
					shuffle: this.shuffle,
					getChamps: this.getChamps,
					setHero: this.setHero,
					DataDragon
				}}
			>
				{this.props.children}
			</Dragon.Provider>
		);
	}
}
export {
	Dragon, Context
};