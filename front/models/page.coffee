
class Page extends Backbone.Model
    ###
    Pages should extend this class
    Every page should have:
        - An html attribute which will be rendered directly
            OR
        - A set of functions in page.panels object.
          Template with same id as the functions name will be loaded
          Code from the function will be executed when panel is rendered
    ###

    defaults:
        title: 'untitled page'
        active: false

    isActive: ->
        @get('active')



module.exports = Page
