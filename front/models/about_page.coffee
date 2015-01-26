Page = require './page.coffee'

class AboutmePage extends Page
    
    defaults: ->
        'title': 'About'
        'html': '
            <p>
                Hey, i\'m Zozor. Check out my github <a href="http://github.com/emilecaron">here</a>!
            </p>
            <p>This app was built using <a href="http://flask.pocoo.org/">Flask</a>, <a href="http://backbonejs.org/">Backbone</a>, <a href="http://getbootstrap.com/">Bootstrap</a> and more.</p>
        '

module.exports = AboutmePage