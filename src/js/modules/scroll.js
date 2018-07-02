
var windowTop, windowHeight, steps;

module.exports =  {
    init: function() {
        this.bindings();
        this.onScroll();
    },

    bindings: function() {
        $(window).scroll(function() {
            this.onScroll();
        }.bind(this));

        $(window).resize(function() {
            this.onScroll();
        }.bind(this));
    },

    onScroll: function() {
        this.setStep();
    },

    setStep: function() {
        var stepToShow = null;
        windowTop = $(window).scrollTop();
        windowHeight = $(window).height();
        var windowBottom = windowTop + windowHeight;

        $('.uit-category').each(function(i, el) {
            if (windowBottom >= $(el).offset().top) {
                stepToShow = $(el).data('category');
            }
        }.bind(this));
        //console.log(stepToShow);
        this.changeNav(stepToShow);
    },

    changeNav: function(step) {
        $('.uit-nav__category').each(function(i, el) {
          $(el).removeClass('uit-highlighted');
            if ($(el).hasClass('uit-nav__category--' + step)) {
                    $(el).addClass('uit-highlighted');
                }
       }.bind(this));
    }
};
