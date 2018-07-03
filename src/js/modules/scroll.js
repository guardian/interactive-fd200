var windowTop, windowHeight, steps, section, downButton;
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

        $('.uit-dropdown__button').click(function(e) {
          e.preventDefault();
          this.showMenu();
        }.bind(this));
    },

    setStep: function() {
        var stepToShow = null;
        windowTop = $(window).scrollTop();
        windowHeight = $(window).height();

        $('.uit-category').each(function(i, el) {
            if (windowTop >= $(el).offset().top - this.percentageOfHeight(10)) {
                stepToShow = $(el).data('category');
            }
        }.bind(this));
        this.changeNav(stepToShow);
    },

    percentageOfHeight: function(percentage) {
        return (windowHeight / 100) * percentage;
    },

    showMenu: function() {
      $('.uit-nav').addClass('uit-nav__mobile');
      $('.uit-dropdown__button').addClass('uit-dropdown__button-rotated');
      $('.uit-dropdown__button').unbind();
      $('.uit-dropdown__button-rotated').click(function(e) {
        e.preventDefault();
        this.hideMenu();
      }.bind(this));
    },

    hideMenu: function() {
      $('.uit-nav').removeClass('uit-nav__mobile');
      $('.uit-dropdown__button-rotated').removeClass('uit-dropdown__button-rotated');
      $('.uit-dropdown__button').click(function(e) {
        e.preventDefault();
        this.showMenu();
      }.bind(this));
    },

    changeNav: function(step) {
        $('.uit-nav__category').each(function(i, el) {
          $(el).removeClass('uit-highlighted');
            if ($(el).hasClass('uit-nav__category--' + step)) {
                    $(el).addClass('uit-highlighted');
                    $('.uit-mobile-nav__category-title').html(sections[step]);
                }
       }.bind(this));
    },
};
