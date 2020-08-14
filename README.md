# Netlify lazy load images plugin

Once site is built, this plugin replaces src and srcsets with inline placeholders and appends a script to lazy load the real sources when the images intersect with the viewport.

Most useful where large image content is added by a site admin through a wysiwyg, a richtext editor, or markdown.

An example of the plugin in action lives here: https://lazy-load-plugin-test.netlify.app/

## Installation

To install, add the following lines to your `netlify.toml` file:

```toml
[[plugins]]
package = "netlify-plugin-lazy-load-images"
```

Note: The `[[plugins]]` line is required for each plugin, even if you have other plugins in your `netlify.toml` file already.

## Configuration

```toml
# netlify.toml
[[plugins]]
  package = "."
    [plugins.inputs]
      excludeFiles = []
      applyContainer = "body"
      excludeElements = '[data-src], .lazy-load'
      replaceThreshold = 0
```

### excludeFiles

Array. Array of glob patterns to exclude from processing by this plugin. Defaults to [].

### excludeElements

String. CSS selector to match on elements to be excluded from lazy-loading. Defaults to selectors used in popular lazy-loading libraries. '.lazy, .lazy-load, \[data-src\]'

### replaceThreshold

Number. Miniumum size in bytes for an image to be replaced by placeholder

