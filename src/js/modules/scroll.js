var windowTop, windowHeight, steps, section;
var sections = ['Abolitionist','Diplomat','Educator','Enterprenuer','Writer','Feminist','Politican'];

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

        $(document).on('click', 'a[href*="#"]', function(e) {
            e.preventDefault();
            var target = $(e.currentTarget).attr('href');

            $('html, body').animate({
                scrollTop: $(target).position().top
            })
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
        $('.uit-mobile-nav').html('');
        this.changeNav(stepToShow);
    },

    changeNav: function(step) {
        $('.uit-nav__category').each(function(i, el) {
          $(el).removeClass('uit-highlighted');
            if ($(el).hasClass('uit-nav__category--' + step)) {
                    $(el).addClass('uit-highlighted');
                    button = "<a href='' class='uit-share__button uit-dropdown__button'><svg class='uit-icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'><path d='M36.33 19.99L25 29.48l-11.33-9.49-1.11 1.11 10.23 10.22 1.63 1.63h1.16l1.63-1.63L37.44 21.1l-1.11-1.11z'/></svg></a>";
                    $('.uit-mobile-nav').html(sections[step] + button);
                }
       }.bind(this));
    },
};
