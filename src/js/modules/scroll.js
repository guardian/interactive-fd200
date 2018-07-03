
var windowTop, windowHeight, steps, section;

module.exports =  {
    init: function() {
        this.bindings();
        this.setStep();
    },

    bindings: function() {
        $(window).scroll(function() {
            this.setStep();
        }.bind(this));

        $(window).resize(function() {
            this.setStep();
        }.bind(this));

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
        this.changeNav(stepToShow);
    },

    changeNav: function(step) {
        $('.uit-nav__category').each(function(i, el) {
          $(el).removeClass('uit-highlighted');
            if ($(el).hasClass('uit-nav__category--' + step)) {
                    $(el).addClass('uit-highlighted');
                }
       }.bind(this));
       $('.uit-mobile-nav').html(step);
    },
};
