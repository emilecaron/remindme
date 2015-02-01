Page = require '../models/page.coffee'

class Pages extends Backbone.Collection

    model: Page

    initialize: ->
        Backbone.on 'changePage', @setActivePage, @

    setActivePage: (page)->
        @active = page




module.exports = Pages
