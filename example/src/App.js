import React from 'react';
import { Provider as ShortcutProvider } from 'keyhandler';

import Key from './Key';

import './App.css';

const demoKeys = [
	'l',
	'k',
	'ctrl+l',
	'ctrl+k',
	'cmd+l',
	'cmd+k',
	'shift+l',
	'shift+k',
	'cmd+shift+l',
	'cmd+shift+k',
	'ctrl+shift+l',
	'ctrl+shift+k',
	'ctrl+cmd+shift+l',
	'ctrl+cmd+shift+k',

	'up',
	'down',
	'left',
	'right',
	'/',
	'?',
	'<',
	'>',
	'$',
	'%',
	'esc',
	'enter',
	'space',
	'backspace',
	'cmd+esc',
	'cmd+enter',
	'cmd+space',
	'cmd+backspace',
];

const Keys = props => (
	<div className="App__keys">
		{ demoKeys.map( key => (
			<Key
				key={ key }
				{ ...props }
				shortcut={ key }
			/>
		) ) }
	</div>
);

export default class App extends React.Component {
	state = {
		showHints: true,
	}

	render () {
		const { showHints } = this.state;

		return (
			<ShortcutProvider disableHints={ ! showHints }>
				<div className="App">
					<label>
						<input
							checked={ showHints }
							type="checkbox"
							onChange={ e => this.setState( { showHints: e.target.checked } ) }
						/>
						Show hints when you hold { '\u2318' }
					</label>

					<Keys />

					<h2>No Hints!</h2>
					<Keys disableHint />
				</div>
			</ShortcutProvider>
		)
	}
}
