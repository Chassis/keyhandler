import PropTypes from 'prop-types';
import React from 'react';

import KeyHandler from './keys';
import KeyContext from './context';

type Props = {
	disableHints: boolean;
}

export default class Provider extends React.Component<Props> {
	static defaultProps = {
		disableHints: false,
	};

	static propTypes = {
		disableHints: PropTypes.bool,
	};

	state = {
		showKeys: false,
	};

	keyHandler: KeyHandler;

	constructor( props: Readonly<Props> ) {
		super( props );

		this.keyHandler = new KeyHandler();
	}

	componentDidMount() {
		this.keyHandler.listen( this.onMetaDown, this.onMetaUp );
	}

	onMetaDown = () => {
		this.setState( {
			showKeys: true,
		} );
	};

	onMetaUp = () => {
		this.setState( {
			showKeys: false,
		} );
	};

	render() {
		const context = {
			handler: this.keyHandler,
			disableHints: this.props.disableHints,
			showKeys: this.state.showKeys,
		};

		return (
			<KeyContext.Provider value={ context }>
				{ this.props.children }
			</KeyContext.Provider>
		);
	}
}
