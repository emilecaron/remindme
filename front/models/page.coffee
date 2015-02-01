PageView = require '../views/page_view.coffee'

class Page extends Backbone.Model
    ###
    Pages should extend this class
    Every page should have:
        - A set of functions in page.panels object.
          Template with same id as the functions name will be loaded
          Code from the function will be executed when panel is rendered
    On creation, a page view will be generated and linked to the model
    ###

    defaults:
        title: 'untitled page'
        active: false

    initialize: ->
        @set 'view', new PageView
            model: @

    isActive: ->
        @get('active')



module.exports = Page
