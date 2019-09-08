interface KeyCode {
	key?: string;
	ctrlKey: boolean;
	metaKey: boolean;
	shiftKey: boolean | null;
};

type Callback = ( e: KeyboardEvent ) => void;

interface Key extends KeyCode {
	id: number;
	callback: Callback;
};

const toCode = ( text: string ) : KeyCode => {
	const keys = text.split( '+' ).map( key => key.trim() );
	const code = {
		key: null,
		ctrlKey: false,
		metaKey: false,
		shiftKey: false,
	};
	for ( let index = 0; index < keys.length; index++ ) {
		let key = keys[index];
		switch (key.toLowerCase()) {
			case 'cmd':
				code.metaKey = true;
				break;

			case 'ctrl':
				code.ctrlKey = true;
				break;

			case 'shift':
				code.shiftKey = true;
				break;

			case 'escape':
			case 'esc':
				code.key = 'escape';
				break;

			case 'enter':
			case 'delete':
			case 'backspace':
			case 'tab':
				code.key = key.toLowerCase();
				break;

			case 'space':
				code.key = ' ';
				break;

			case 'up':
			case 'down':
			case 'left':
			case 'right':
				code.key = 'arrow' + key.toLowerCase();
				break;

			default:
				if ( code.key ) {
					throw new Error( 'Only a single key is supported' );
				}
				if ( key.length !== 1 ) {
					throw new Error( 'Only single characters are supported' );
				}
				code.key = key.toLowerCase();
				if ( code.key === key.toUpperCase() ) {
					// Ignore shift status for symbols, and just map to the
					// value. This should work reliably on all keyboards.
					code.shiftKey = null;
				}
				break;
		}
	}

	if ( ! code.key ) {
		throw new Error( 'keyCode is required' );
	}

	return code;
};

const COMPARE_PROPS = [ 'key', 'metaKey', 'ctrlKey', 'shiftKey' ];
const compare = ( left: KeyCode, right: KeyCode ) => {
	for ( let index = 0; index < COMPARE_PROPS.length; index++ ) {
		let prop = COMPARE_PROPS[ index ];
		if ( left[ prop ] !== right[ prop ] && left[ prop ] !== null && right[ prop ] !== null ) {
			return false;
		}
	}

	return true;
};

export default class Keys {
	handlers: {
		[ key: string ]: Key[];
	};
	nextIndex: number;

	constructor() {
		this.handlers = {};
		this.nextIndex = 0;
	}

	register( key: string, callback: Callback ) {
		const code = { ...toCode( key ), callback, id: this.nextIndex++ };
		this.handlers[ code.key ] = this.handlers[ code.key ] || [];
		this.handlers[ code.key ].push( code );
		return code.id;
	}

	unregister( key: string, id: number ) {
		const code = toCode( key );
		if ( ! ( code.key in this.handlers ) ) {
			return false;
		}
		let current = this.handlers[ code.key ];
		let next = current.filter(item => {
			return ! ( compare( item, code ) && item.id === id );
		});
		this.handlers[ code.key ] = next;
		return current !== next;
	}

	trigger( e: KeyboardEvent ) {
		if ( ! e.key ) {
			return;
		}

		const key = e.key.toLowerCase();
		if ( ! ( key in this.handlers ) ) {
			return;
		}

		// Slice to ensure handlers doesn't change while firing.
		let handlers = this.handlers[ key ].slice();
		const comparable = {
			key,
			ctrlKey: e.ctrlKey,
			metaKey: e.metaKey,
			shiftKey: e.shiftKey,
		};
		for ( let index = 0; index < handlers.length; index++ ) {
			let handler = handlers[ index ];
			if ( compare( comparable, handler ) ) {
				handler.callback( e );
			}
		}
	}

	listen( onKeyDown: () => void, onKeyUp: () => void ) {
		window.addEventListener( 'keydown', e => {
			if ( e.key === 'Meta' &&  e.metaKey ) {
				onKeyDown();
			}
			this.trigger( e );
		} );
		window.addEventListener( 'keyup', e => {
			if ( e.key === 'Meta' && ! e.metaKey ) {
				onKeyUp();
			}
		} );
		window.addEventListener( 'blur', () => {
			onKeyUp();
		} );
	}
}
