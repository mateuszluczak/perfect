(function() {
    var App = {
        /** @type View **/
        view: null,

        page: {},

        pages: [],

        init: function() {
            App.getPageUrl()
                .then(App.checkIfPageInStorage)
                .then(App.changeView)
                .then(function() {
                    App.view.show();
                });
        },

        getPageUrl: function() {
            var dfd = new $.Deferred();

            chrome.tabs.getSelected(null, function(tab) {
                var img = $('<img>').attr('src', 'chrome://favicon/' + tab.url.replace(/#.*$/, ''));
                setTimeout(function() {
                    var colorThief = new ColorThief();
                    var color = colorThief.getColor(img[0], 1);

                    App.page = {
                        url: tab.url.replace(/#.*$/, ''),
                        title: tab.title,
                        color: 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')'
                    };
                    dfd.resolve();
                }, 1500);
            });

            return dfd.promise();
        },

        checkIfPageInStorage: function() {
            var dfd = new $.Deferred();

            chrome.storage.local.get('pages', function(result){
                var found = [];

                App.page.record = [];

                if (result && result.pages && result.pages.length) {
                    App.pages = result.pages;

                    found = result.pages.filter(function(page) {
                        return page.url === App.page.url;
                    });
                } else {
                    dfd.resolve('default');
                }

                if (found.length) {
                    App.page.record = found[0].record;
                    dfd.resolve('metrics');
                } else {
                    dfd.resolve('default');
                }
            });

            return dfd.promise();
        },

        changeView: function(view) {
            var dfd = new $.Deferred();

            if (App.view) {
                App.view.hide();
            }

            switch (view) {
                case 'default':
                    App.view = new DefaultView($('.view.default'), App);
                    dfd.resolve();
                    break;
                case 'metrics':
                    chrome.tabs.executeScript({
                        file: 'js/Timing.js'
                    },
                    function(results) {
                        App.page.results = results[0];
                        App.view = new MetricsView($('.view.metrics'), App);
                        dfd.resolve();
                    });
                    break;
            }

            return dfd.promise();
        }
    };

    chrome.runtime.onMessage.addListener(function(request) {
        if (request.page === 'load') {
            App.init();
        }
    });

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.executeScript(tab.id,{
            file: 'js/Inject.js'
        });
    });
})();
