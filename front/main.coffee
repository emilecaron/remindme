$ ->
    ###
    all class def must be encapsulated inside $.ready()
    otherwise templates from page.html won't be available.
    ###
    
    #FormView = require './views/form_view.coffee'
    #Form = require './models/form.coffee'

    Header = require './views/header.coffee'
    Page = require './views/page.coffee'


    class AppView extends Backbone.View

        pages:
            #remindme: new RemindmePage()
            remindme: new Page()

        currentPage: null

        switchPage: (page)

        initialize: ->
            console.log 'Initializing app'
            @header = new Header()

        render: ->
            console.log 'Rendering app'
            console.log @pages
            @currentPage.render() if @currentPage
            @header.render()

    window.app = new AppView()
    window.app.render()

