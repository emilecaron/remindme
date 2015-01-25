
Page = require './page.coffee'

class RemindmePage extends Page
    
    initialize: ->
        @set
            'title': 'Remind me'

module.exports = RemindmePage
