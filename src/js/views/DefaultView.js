var DefaultView = (function () {
    var template = [
        "<div class='button-group'>",
            "<h4>This page is not measured</h4>",
            "<button class='btn add-page'>Add Page<i class='mdi-content-add right'></i></button>",
        "</div>"
    ].join('\n');

    function DefaultView($el, $scope) {
        View.call(this, $el, $scope);

        this.bindUIEvents();

        this.render();
    }

    DefaultView.prototype = Object.create(View.prototype);

    DefaultView.prototype.addPage = function() {
        this.$scope.pages.push(this.$scope.page);

        chrome.storage.local.set({'pages': this.$scope.pages});

        this.$scope.changeView('metrics').then(function () {
            this.$scope.view.show();
        }.bind(this));
    };

    DefaultView.prototype.bindUIEvents = function () {
        this.$el.one('click', '.add-page', this.addPage.bind(this));
    };

    DefaultView.prototype.render = function() {
        this.$el.html(Mustache.to_html(template));
    };

    return DefaultView;
})();
