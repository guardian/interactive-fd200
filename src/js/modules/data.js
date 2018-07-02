var handlebars = require('handlebars');
var entryHTML = require('../templates/entry.html');
var listHTML = require('../templates/list.html');

var sections = ['Abolitionist','Diplomat','Educator','Enterprenuer','Writer','Feminist','Politican']

module.exports =  {
    init: function() {
        this.initHandlebars();
        this.fetchData();
    },

    initHandlebars: function() {
        handlebars.registerHelper('handlise', function(string) {
            return string.replace(' ', '-').toLowerCase();
        });
    },

    fetchData: function() {
        $.getJSON('https://interactive.guim.co.uk/docsdata-test/1rqzQ9H3sQO4dZDHORvmn2kTJAavbwy9P2_GvlTwsUDY.json', function(response) {
            var data = response.sheets.Sheet1;
            var dataByCategory = {};

            for (var i in sections) {
                dataByCategory[sections[i]] = [];
            }

            for (var i in data) {
                dataByCategory[data[i].category].push(data[i]);
            }

            this.injectHTML(dataByCategory);
        }.bind(this));
    },

    injectHTML: function(data) {
        console.log(data);

        var entryTemplate = handlebars.compile(entryHTML);
        var compiledEntries = entryTemplate(data);

        $('.uit-main').append(compiledEntries);

        var listTemplate = handlebars.compile(listHTML);
        var compiledList = listTemplate(data);

        $('.uit-nav').append(compiledList);
    }
};
