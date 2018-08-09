import { h, Component } from 'preact';
import { Dragon } from './index';
const withContext = (C) => {
	return class WithContextComponent extends Component {
		render() {
			return (
				<Dragon.Consumer>
					{context => (<C {...this.props} context={context} />)}
				</Dragon.Consumer>
			);
		}
	}
};

export default withContext;