
Page = require './page.coffee'

class RemindmePage extends Page
    
    defaults: ->
        title: 'Remind me'
        panels:
            'rme_welcome': ->
                $('#no_button').click ->
                    Backbone.trigger 'switchPanel', 'rme_date'

            'rme_date': ->
                $('.datepicker').datepicker().on 'changeDate', (e)->
                        Backbone.trigger 'setPageData',
                            'date': e.date
                        Backbone.trigger 'switchPanel', 'rme_email'

            'rme_email': ->
                console.log pageData
    

module.exports = RemindmePage
