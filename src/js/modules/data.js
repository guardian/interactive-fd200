var Mustache = require('mustache');
var markdown = require('markdown').markdown;
var entryHTML = require('../templates/entry.html');
var listHTML = require('../templates/list.html');

var sections = ['Abolitionist','Diplomat','Educator','Enterprenuer','Writer','Feminist','Politican']

module.exports =  {
    init: function() {
        this.fetchData();
    },

    fetchData: function() {
        $.getJSON('https://interactive.guim.co.uk/docsdata-test/1rqzQ9H3sQO4dZDHORvmn2kTJAavbwy9P2_GvlTwsUDY.json', function(response) {
            var data = response.sheets.Sheet1;
            var categories = [];

            for (var i in sections) {
                categories.push({
                    name: sections[i],
                    handle: i.toLowerCase(),
                    entries: []
                });
            }

            for (var i in data) {
                for (var category in categories) {
                    if (categories[category].name === data[i].category) {
                        data[i].handle = data[i].name.replace(' ', '-').toLowerCase();
                        data[i].description = markdown.toHTML(data[i].description);
                        categories[category].entries.push(data[i]);
                    }
                }
            }

            this.injectHTML({categories: categories});
        }.bind(this));
    },

    injectHTML: function(data) {
        var compiledEntries = Mustache.render(entryHTML, data);
        $('.uit-main').append(compiledEntries);

        var compiledList = Mustache.render(listHTML, data);
        $('.uit-nav').append(compiledList);
    }
};
