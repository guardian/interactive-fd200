var windowTop, windowHeight, steps, section, downButton;
var sections = ['Abolitionist','Diplomat','Educator','Enterprenuer','Writer','Feminist','Politican'];

module.exports =  {
    init: function() {
        this.bindings();
        this.setStep();
        this.getRandom();
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

            if ($('html').hasClass('nav-is-expanded')) {
                this.hideMenu();
            }

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
            if (windowTop >= $(el).offset().top - this.percentageOfHeight(15)) {
                stepToShow = $(el).data('category');
            }
        }.bind(this));
        $('.uit-nav__category-title').addClass('uit-nav__hidden');
        this.changeNav(stepToShow);
        this.getRandom();
    },

    percentageOfHeight: function(percentage) {
        return (windowHeight / 100) * percentage;
    },

    showMenu: function() {
        $('html').addClass('nav-is-expanded');
        $('.uit-dropdown__button').unbind();
        $('.uit-dropdown__button').click(function(e) {
            e.preventDefault();
            this.hideMenu();
        }.bind(this));
    },

    hideMenu: function() {
        $('html').removeClass('nav-is-expanded');
        $('.uit-dropdown__button').unbind();
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
                $('.uit-nav__category-title').removeClass('uit-nav__hidden');
            }
       }.bind(this));
    },

    getRandom: function(){
      var random = ( Math.floor(Math.random() * $('.uit-entry').length));
      var random_entry = $('.uit-entry')[random];
      var random_id = $(random_entry).attr('id');
      $('#uit-nav__random').attr('href', '#' + random_id);
    }
};
