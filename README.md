# Keyhandler

Handle keyboard shortcuts in your React components, and automatically show hints to users.

<img alt="Hint text displayed over component" src="https://user-images.githubusercontent.com/21655/64488716-ded9c900-d242-11e9-8c5e-4b9e50e21d6f.png" />

[![NPM](https://img.shields.io/npm/v/@chassis-wp/keyhandler.svg)](https://www.npmjs.com/package/@chassis-wp/keyhandler)


## Install

```bash
# With yarn:
yarn add @chassis-wp/keyhandler

# With npm:
npm install --save @chassis-wp/keyhandler
```


## Usage

To use Keyhandler, first render the Keyhandler provider at the top-level of your tree. This provider should be rendered above any Keyhandler components.

```jsx
import { Provider } from '@chassis-wp/keyhandler';

ReactDOM.render(
	<Provider>
		<App />
	</Provider>,
	document.getElementById( 'root' )
);
```

Then, wherever you want to register a keyboard shortcut, render a KeyHandler component.

```jsx
import React from 'react';

import KeyHandler from '@chassis-wp/keyhandler';

function SaveButton( props ) {
	return (
		<button
			className="SaveButton"
			type="button"
			onClick={ props.onSave }
		>
			<KeyHandler
				shortcut="cmd+s"
				onTrigger={ props.onSave }
			/>

			Save
		</button>
	);
}
```

### Shortcuts

The shortcut prop specifies the combination of keyboard characters to press in order to trigger your callback.

Shortcuts are specified as a string, with optional modifiers separated by plus (`+`) characters. `cmd`, `ctrl`, and `shift` are supported as modifiers; `alt` is not supported due to inconsistent behaviour across platforms.

Symbols are supported, but note that the `shift` modifier has no effect, as many keyboards place multiple symbols on the same physical key; instead, use the character directly (e.g. `?` instead of `shift+/`).

The following special keys are also supported:

* `escape` (or `esc`)
* `enter`
* `delete`
* `backspace`
* `space`
* `up`, `down`, `left`, `right`

Sequences are not currently supported.


### Hints

Keyhandler by default renders hints when the meta key (Cmd on macOS) is held.

The hint is rendered into the tree at the position of the KeyHandler component, positioned at the centre of the nearest positioning parent (i.e.  parent with `position: relative/absolute/etc`).

To disable this behaviour on a specific handler, set the `disableHint` prop to `true`:

```jsx
<Key disableHint shortcut="cmd+k" />
```

To disable this behaviour globally, set the `disableHints` prop on the provider to `true`:
```jsx
<ShortcutProvider disableHints>
	<App />
</ShortcutProvider>
```


## License

MIT © [rmccue](https://github.com/rmccue)
