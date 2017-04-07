# DraftJS link Plugin

*This is a plugin for the `draft-js-plugins-editor`.*

## Usage

```js
import createLinkPlugin from 'draft-js-link-plugin'
import 'draft-js-link-plugin/lib/plugin.css'
const linkPlugin = createLinkPlugin()
```

## Importing the default styles

The plugin ships with a default styling available at this location in the installed package:
`node_modules/draft-js-link-plugin/lib/plugin.css`.

### Webpack Usage
Follow the steps below to import the css file by using Webpack's `style-loader` and `css-loader`.

1. Install Webpack loaders: `npm install style-loader css-loader --save-dev`
2. Add the below section to Webpack config.

    ```js
    module: {
      loaders: [{
        test: /\.css$/,
        loaders: [
          'style', 'css'
        ]
      }]
    }
    ```

3. Add the below import line to your component to tell Webpack to inject the styles.

    ```js
    import 'draft-js-link-plugin/lib/plugin.css';
    ```
4. Restart Webpack.
