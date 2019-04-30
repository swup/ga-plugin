import Plugin from '@swup/plugin';

export default class GaPlugin extends Plugin {
    name = "SwupGaPlugin";

    mount() {
        this.swup.on('contentReplaced', event => {
            if (typeof window.ga === 'function') {
                let title = document.title;
                let url = window.location.pathname + window.location.search;

                window.ga('set', 'title', title);
                window.ga('set', 'page', url);
                window.ga('send', 'pageview');

                this.swup.log(`GA pageview (url '${url}').`);
            } else {
                console.warn('GA is not loaded.');
            }
        })
    }
}