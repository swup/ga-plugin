# Swup Google Analytics Plugin

A [swup](https://swup.js.org) plugin for integrating Google Analytics.

- Trigger pageview events after each page change
- This event is not triggered on intial load, so the first page view must be triggered elsewhere
- However, the page view event is by default triggered in the [Javascripts tracking snippet](https://developers.google.com/analytics/devguides/collection/analyticsjs/#the_javascript_tracking_snippet) used for embedding Google Analytics

Simplified code run by this plugin on the `page:view` hook:

```js
// On sites using gtag.js
window.gtag('config', GA_MEASUREMENT_ID, {
  page_title: title,
  page_path: url
});

// On sites using analytics.js
window.ga('set', 'title', document.title);
window.ga('set', 'page', window.location.pathname + window.location.search);
window.ga('send', 'pageview');
```

## Installation

Install the plugin from npm and import it into your bundle.

```bash
npm install @swup/ga-plugin
```

```js
import SwupGaPlugin from '@swup/ga-plugin';
```

Or include the minified production file from a CDN:

```html
<script src="https://unpkg.com/@swup/ga-plugin@2"></script>
```

## Usage

To run this plugin, include an instance in the swup options.

```javascript
const swup = new Swup({
  plugins: [new SwupGaPlugin()]
});
```

## Options

### gaMeasurementId

This option is only required on sites using gtag.js, usually loaded like this:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

The `window.gtag` function the measurement ID to trigger page views.

```javascript
const swup = new Swup({
  plugins: [
    new SwupGaPlugin({ gaMeasurementId: GA_MEASUREMENT_ID })
  ]
});
```
