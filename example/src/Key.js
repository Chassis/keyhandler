import React from 'react';

import KeyHandler from 'keyhandler';

import './Key.css';

export default class Key extends React.Component {
	static defaultProps = {
		disableHint: false,
	};

	timer = null;
	state = {
		triggered: false,
	};

	onReset = () => {
		this.setState( {
			triggered: false,
		} );
	}

	onTrigger = () => {
		if ( this.timer ) {
			window.clearTimeout( this.timer );
		}
		this.setState( {
			triggered: true,
		}, () => {
			this.timer = window.setTimeout( this.onReset, 1500 );
		} );
	}
	render() {
		const { disableHint } = this.props;
		const { triggered } = this.state;

		return (
			<div className={ triggered ? 'Key Key--triggered' : 'Key' }>
				<KeyHandler
					disableHint={ disableHint }
					shortcut={ this.props.shortcut }
					onTrigger={ this.onTrigger }
				/>

				{ this.props.shortcut.replace( '+', '+\u200B' ) }
			</div>
		)
	}
}