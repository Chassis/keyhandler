# keyhandler

> 

[![NPM](https://img.shields.io/npm/v/keyhandler.svg)](https://www.npmjs.com/package/keyhandler) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
# With yarn:
yarn add keyhandler

# With npm:
npm install --save keyhandler
```


## Usage

```tsx
import * as React from 'react'

import MyComponent from 'keyhandler'

class Example extends React.Component {
	render () {
		return (
			<MyComponent />
		)
	}
}
```


### Hints

Keyhandler by default renders hints when the meta key (Cmd on macOS) is pressed.

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

Available properties:

* `hints`

## License

MIT © [rmccue](https://github.com/rmccue)
