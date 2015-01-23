var View = (function() {
    function View($el, $scope) {
        this.$el = $el;
        this.$scope  = $scope;
    }

    View.prototype = {
        constructor: View,

        hide: function() {
            this.$el.removeClass('is-active');
        },

        show: function() {
            this.$el.addClass('is-active');
        }
    };

    return View;
})();