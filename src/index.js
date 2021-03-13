import Plugin from '@swup/plugin';

export default class GaPlugin extends Plugin {
	name = 'GaPlugin';

	constructor(options) {
		super();
		const defaultOptions = {
			gaMeasurementId: null
		};

		this.options = {
			...defaultOptions,
			...options
		};
	}

	mount() {
		this.swup.on('contentReplaced', (event) => {
			if (typeof gtag === 'function') {
				const title = document.title;
				const url = window.location.pathname + window.location.search;
				const gaId = this.options.gaMeasurementId;

				if (!gaId) {
					throw new Error('gaMeasurementId option is required for gtag.');
				}

				window.gtag('config', gaId, {
					page_title: title,
					page_path: url
				});
				this.swup.log(`GTAG pageview (url '${url}').`);
			} else if (typeof window.ga === 'function') {
				const title = document.title;
				const url = window.location.pathname + window.location.search;

				window.ga('set', 'title', title);
				window.ga('set', 'page', url);
				window.ga('send', 'pageview');

				this.swup.log(`GA pageview (url '${url}').`);
			} else {
				console.warn("window.gtag and window.ga don't exists.");
			}
		});
	}
}
