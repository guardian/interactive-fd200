var handlebars = require('handlebars');
var entryHTML = require('../templates/entry.html');

module.exports =  {
    init: function() {
        this.initHandlebars();
        this.fetchData();
    },

    initHandlebars: function() {
        handlebars.registerHelper('if_eq', function(a, b, opts) {
            if (a == b) {
                return opts.fn(this);
            } else {
                return opts.inverse(this);
            }
        });
    },

    fetchData: function() {
        $.getJSON('https://interactive.guim.co.uk/docsdata/1rqzQ9H3sQO4dZDHORvmn2kTJAavbwy9P2_GvlTwsUDY.json', function(response) {
            var data = response.sheets.Sheet1;
            console.log(data);
            this.injectHTML(data);
        }.bind(this));
    },

    injectHTML: function(data) {
        var entryTemplate = handlebars.compile(entryHTML);
        var compiledEntries = entryTemplate(data);

        $('.uit').append(compiledEntries);
    }
};
