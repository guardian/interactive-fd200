var Mustache = require('mustache');
var markdown = require('markdown').markdown;
var entryHTML = require('../templates/entry.html');
var listHTML = require('../templates/list.html');
var count;

var sections = ['Abolitionist','Diplomat','Educator','Entrepreneur','Writer','Feminist','Politician']

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
                    description: this.getDescription(sections[i]),
                    entries: []
                });
            }

            for (var i in data) {
                for (var category in categories) {
                    if (categories[category].name === data[i].category) {
                        data[i].handle = data[i].name.replace(/ /g, '-').toLowerCase();
                        data[i].hasIllustration = data[i].hasIllustration === 'TRUE';
                        data[i].description = markdown.toHTML(data[i].description);
                        data[i].twitter = 'https://www.twitter.com/' + data[i].twitter.replace('@', '');
                        categories[category].entries.push(data[i]);
                    }
                }
            }

            console.log(categories);

            this.injectHTML({categories: categories});
        }.bind(this));
    },

    injectHTML: function(data) {
        var compiledEntries = Mustache.render(entryHTML, data);
        $('.uit-main').append(compiledEntries);

        var compiledList = Mustache.render(listHTML, data);
        $('.uit-nav__category-wrapper').append(compiledList);
        this.hideLoader();
    },

    getDescription: function(section) {
        var descriptions = {
            'Abolitionist': 'Those organizing and speaking out against injustice, often times at risk of their careers or even their own lives. The risk of Douglass being re-enslaved did not stop him from becoming America’s most influential Black male abolitionist.',
            'Diplomat': 'Those thriving in delicate and divisive situations, often inspiring those most depleted of inspiration. For decades, Douglass served as the unofficial diplomat of Black America toward White America. He also served officially as a diplomat as the US minister resident to Haiti from 1889 to 1891.',
            'Educator': 'Those committed to teaching away bigotry and interpreting ideas critical to human growth through books and film, lectures and laughter, in formal and informal classrooms. Douglass was an early advocate of school desegregation and never stopped thinking of ways to expand education for African Americans.',
            'Entrepreneur': 'Those providing opportunities where none may have otherwise been found, using their enterprises or wealth from their enterprises to advance a social good. Douglass advanced abolitionism as a publisher in the newspaper business in the years before the Civil War.',
            'Writer': 'Those who grab us, who mobilize us through screenplays and novels, lyrics and essays, journalism and poetry, editing and scholarship. Douglass is most known as a moving orator. But his writings in newspapers and books and others were no less moving, no less influential.',
            'Feminist': 'Those leading movements to demand equality and empowerment for women. In 1848, Douglass attended the first women’s rights convention in Seneca Falls, New York, and emerged as one of the most outspoken male supporters of women’s suffrage in the 19th century.',
            'Politician': 'Those using their platform like few others to help bend justice and opportunity toward those who have been denied it. In 1872, Douglass served as presidential elector at large for the State of New York. He also moved that year to Washington, DC, and became a powerful figure in local and federal politics.'
        };

        return descriptions[section];
    },

    hideLoader: function() {
        $('.uit-loading').addClass('is-loaded');
    },
};
