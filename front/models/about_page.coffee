Page = require './page.coffee'

class AboutmePage extends Page
    
    defaults: ->
        title: 'About'
        panels:
            about_panel: ->

module.exports = AboutmePage