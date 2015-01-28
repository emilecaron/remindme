
Page = require './page.coffee'

class RemindmePage extends Page
    
    defaults: ->
        title: 'Remind me'
        panels: 
            'rme_welcome': ->
                view = @
                console.log 'hello', $('#welcome_button'), document.getElementById "welcome_button"
                $('#welcome_button').click ->
                    console.log 'mab', view
                    Backbone.trigger 'switchPanel', 'rme_date'
            'rme_date': ->
                console.log 'at last'
    

module.exports = RemindmePage
