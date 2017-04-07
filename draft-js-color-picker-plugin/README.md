# DraftJS color picker Plugin

*This is a plugin for the `draft-js-plugins-editor`.*

## Usage

This is plugin is used in the `draft-js-modal-plugin`.*

The styleMap `colorStyleMap` should be exported from this plugin and used in the `draft-js-plugins-editor`

```js
import {colorStyleMap} from '../draft-js-color-picker-plugin/src/'

<Editor
  onChange={this.onChange}
  customStyleMap={colorStyleMap}
```
