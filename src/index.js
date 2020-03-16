import Plugin from '@swup/plugin';

export default class GaPlugin extends Plugin {
    name = "GaPlugin";

  constructor(options) {
      super();
      const defaultOptions = {
          gaMeasurementId: false,
        };

      this.options = {
          ...defaultOptions,
          ...options
     };
   }

    mount() {
        this.swup.on('contentReplaced', event => {
          if (typeof gtag === 'function') {

            let title = document.title;
            let url = window.location.pathname + window.location.search;
            let gaId = this.options.gaMeasurementId;

            if (gaId === false) {
              console.warn('please add your GA Measurement Id');
            }

            gtag('config', gaId, {
              'page_title' : title,
              'page_path': url
            });

          } else if (typeof window.ga === 'function') {
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
