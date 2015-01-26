
Page = require './page.coffee'

class RemindmePage extends Page
    
    defaults: ->
        'title': 'Remind me'
        'html': '<h1>Hello world!</h1>'

module.exports = RemindmePage
