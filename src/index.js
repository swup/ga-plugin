import Plugin from '@swup/plugin';

export default class SwupGaPlugin extends Plugin {
	name = 'SwupGaPlugin';

	requires = { swup: '>=4' };

	defaults = {
		gaMeasurementId: null
	};

	constructor(options = {}) {
		super();
		this.options = { ...this.defaults, ...options };
	}

	mount() {
		this.swup.hooks.on('replaceContent', this.trackPageView);
	}

	unmount() {
		this.swup.hooks.off('replaceContent', this.trackPageView);
	}

	trackPageView = () => {
		const title = document.title;
		const url = window.location.pathname + window.location.search;

		if (typeof window.gtag === 'function') {
			this.trackPageViewInGtag({ title, url });
			this.swup.log(`GA page view: ${url} (gtag.js)`);
		} else if (typeof window.ga === 'function') {
			this.trackPageViewInGa({ title, url });
			this.swup.log(`GA page view: ${url} (analytics.js)`);
		} else {
			console.warn('Neither window.gtag nor window.ga are present on the page');
		}
	}

	trackPageViewInGtag = ({ title, url }) => {
		const { gaMeasurementId } = this.options;
		if (!gaMeasurementId) {
			console.error('The gaMeasurementId option is required for gtag.js');
			return;
		}

		window.gtag('config', gaMeasurementId, {
			page_title: title,
			page_path: url
		});
	}

	trackPageViewInGa = ({ title, url }) => {
		window.ga('set', 'title', title);
		window.ga('set', 'page', url);
		window.ga('send', 'pageview');
	}
}
