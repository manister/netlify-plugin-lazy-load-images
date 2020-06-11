# Netlify lazy load images plugin

Once site is built, this plugin replaces src and srcsets with inline placeholders and appends a script to lazy load the real sources when the images intersect with the viewport.

## Installation

To install, add the following lines to your `netlify.toml` file:

```toml
[[plugins]]
package = "netlify-plugin-lazy-load-images"
```

Note: The `[[plugins]]` line is required for each plugin, even if you have other plugins in your `netlify.toml` file already.

## Configuration

```toml
[[plugins]]
package = "netlify-plugin-lazy-load-images"

  [plugins.inputs]
  paletteSize = 1
  exclude = []
```

### paletteSize

Number. Number of colours to fetch from souce image when creating the placeholder.

### exclude

Array. Array of glob patterns to exclude from processing by this plugin.