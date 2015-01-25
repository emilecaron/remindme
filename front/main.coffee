$ ->
    ###
    all class def must be encapsulated inside $.ready()
    otherwise templates from page.html won't be available.
    ###
    
    #FormView = require './views/form_view.coffee'
    #Form = require './models/form.coffee'

    Header = require './views/header.coffee'
    Pages = require './collections/pages.coffee'
    RemindmePage = require './models/remindme_page.coffee'


    class AppView extends Backbone.View

        events:
            'changePage': 'onChangePage'

        initialize: ->
            console.log 'Initializing app'
            remindme = new RemindmePage()
            @pages = new Pages([remindme])
            @header = new Header()
            Backbone.on 'all', (name)->
                console.log 'proxy'
                @trigger name

        render: ->
            console.log 'Rendering appplication.'
            @header.render()

        onPageChange: (page)->
            console.log 'event received in main:', page

    window.app = new AppView()
    window.app.render()

