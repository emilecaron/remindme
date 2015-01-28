
Page = require './page.coffee'

class RemindmePage extends Page
    
    defaults: ->
        title: 'Remind me'
        panels: 
            'rme_welcome': ->
                $('#welcome_button').click ->
                    Backbone.trigger 'switchPanel', 'rme_date'
            'rme_date': ->
                console.log 'at last'
    

module.exports = RemindmePage
