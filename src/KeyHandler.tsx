import PropTypes from 'prop-types';
import React from 'react';

import KeyContext from './context';

import './KeyHandler.css';

export type Props = {
	disableHint: boolean;
	enabled: boolean;
	label?: string;
	shortcut: string;
	onTrigger: Function;
};

export default class KeyHandler extends React.Component<Props> {
	static contextType = KeyContext;

	static defaultProps = {
		enabled: true,
		disableHint: false,
	};

	static propTypes = {
		disableHint: PropTypes.bool,
		enabled: PropTypes.bool,
		shortcut: PropTypes.string,
		onTrigger: PropTypes.func,
	};

	handler: number | null;

	constructor( props: Props ) {
		super( props );
		this.handler = null
	}

	componentDidMount() {
		if ( ! this.context ) {
			throw new Error( 'KeyHandler provider must be rendered' );
		}

		// Register key handler.
		this.handler = this.context.handler.register( this.props.shortcut, this.onTrigger );
	}

	componentDidUpdate( prevProps: Props ) {
		if ( prevProps.shortcut !== this.props.shortcut ) {
			// Unregister and re-register.
			this.context.handler.unregister( prevProps.shortcut, this.handler );
		}
	}

	componentWillUnmount() {
		// Unregister.
		this.context.handler.unregister( this.props.shortcut, this.handler );
	}

	onTrigger = ( e: KeyboardEvent ) => {
		if ( ! this.props.enabled ) {
			return;
		}

		e.preventDefault();
		this.props.onTrigger();
	}

	render() {
		if ( ! this.context || this.props.disableHint || this.context.disableHints ) {
			return null;
		}

		const shortcut = this.props.shortcut;
		const keyText = shortcut.toLowerCase()
			.replace( 'ctrl', '^' )
			.replace( 'cmd', '\u2318' )
			.replace( 'shift', '\u21E7' )
			.replace( 'left', '\u2190' )
			.replace( 'up', '\u2191' )
			.replace( 'right', '\u2192' )
			.replace( 'down', '\u2193' )
			.replace( 'backspace', '\u232B' )
			.split( '+' )
			.map( t => t[0].toUpperCase() + t.substring( 1 ).toLowerCase() )
			.join( '' );

		const classes = [ "KeyHandler" ];
		if ( this.context.showKeys ) {
			classes.push( "visible" );
		}

		return <span className={ classes.join( ' ' ) }>
			<span>{ keyText }</span>
		</span>;
	}
};
