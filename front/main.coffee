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

        el: '#page'

        events:
            'changePage': 'onChangePage'

        initialize: ->
            console.log 'Initializing app'
            remindme = new RemindmePage()
            @pages = new Pages([remindme])
            @header = new Header()

            _app = @
            Backbone.on 'all', (name)->
                console.log arguments
                _app[name](arguments) if _app[name]

        render: ->
            console.log 'Rendering appplication.'
            @header.render()

        changePage: (page)->
            console.log 'event received in main:', page
            page.render()
            @$el.html(page.el)


    window.app = new AppView()
    window.app.render()

